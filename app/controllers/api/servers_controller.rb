class Api::ServersController < ApplicationController
  def index
    server_memberships = Membership.includes(:server).server_memberships(current_user.id)
    @servers = server_memberships.map { |membership| membership.server }
    render :index
  end

  def dms_index
    @dms = Membership.includes(:server, :server_members, :channel).dm_memberships(current_user.id)
    @gcs = Membership.includes(:server, :server_members, :channel).gc_memberships(current_user.id)
    render :dms_index
  end

  def index_public
    @servers = Server.all.where(public:true).joins(:members).group("servers.id").order('count(*) desc')
    render :public_index
  end

  def show
    @server = Server.includes(:channels, :members, :invitations, :messages, :reactions).find_by(id: params[:id])
    if @server
      render :show
    else
      render json: ["invalid server id"], status:400
    end
  end

  def create
    @server = Server.new(server_params)
    if @server.save
      if server_params[:genre] == "dm" || server_params[:genre] == "gc"
        Membership.create!(user_id: current_user.id, server_id: @server.id, description: server_params[:genre])
        @channel = Channel.create!(server_id: @server.id, name:server_params[:genre])
        @other_user = Membership.create!(user_id: @server.owner_id, server_id: @server.id, description: server_params[:genre]).user if server_params[:genre] == "dm"
      else
        Membership.create!(user_id: current_user.id, server_id: @server.id, description: "server")
        Channel.create!(server_id: @server.id, name:"general")
      end


      case server_params[:genre]
      when "gaming"
        Channel.create!(server_id: @server.id, name:"gaming")
        Channel.create!(server_id: @server.id, name:"highlights")
      when "music"
        Channel.create!(server_id: @server.id, name:"trending")
      when "education"
        Channel.create!(server_id: @server.id, name:"q-and-a")
      when "scienceAndTech"
        Channel.create!(server_id: @server.id, name:"latest-news")
      when "entertainment"
        Channel.create!(server_id: @server.id, name:"clips")
      end

      render :show
    else
      render json: @server.errors.full_messages, status:400
    end
  end

  def update
    @server = Server.find_by(id:params[:id])
    if @server.owner != current_user && @server.genre != "gc"
      render json: ["only the owner can modify a server"], status: 401
    elsif @server.update_attributes(server_params)
      render :updated_show
    else
      render json: @server.errors.full_messages, status: 400
    end
  end

  def destroy
    @server = Server.find_by(id:params[:id])
    if @server.owner != current_user && @server.genre != "dm" && @server.genre != "gc"
      render json: ["only the owner can delete a server"], status: 401
    elsif current_user.memberships.to_a.none? { |membership| membership.server_id == @server.id }
      render json: ["only a member can delete a direct message"], status: 401
    else
      @server.destroy
      render json: @server.id
    end
  end

  def server_params
    params.require(:server).transform_keys { |key| key.to_s.underscore }.permit(:name, :owner_id, :public, :genre, :icon, :description, :banner)
  end
end