class Api::ServersController < ApplicationController
  def index
    server_memberships = Membership.server_memberships(current_user.id)
    @servers = server_memberships.map { |membership| membership.server }
    render :index
  end

  def index_public
    @servers = Server.all.where(public:true)
    render :index
  end

  def show
    @server = Server.includes(:channels, :members).find_by(id: params[:id])
    if @server
      render :show
    else
      render json: ["invalid server id"], status:400
    end
  end

  def create
    @server = Server.new(server_params)
    if @server.save
      Membership.create!(user_id: current_user.id, server_id: @server.id, description: "server")
      Channel.create!(server_id: @server.id, name:"general")

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
    if @server.owner != current_user
      render json: ["only the owner can modify a server"], status: 401
    elsif @server.update_attributes(server_params)
      render :show
    else
      render json: @server.errors.full_messages, status: 400
    end
  end

  def destroy
    @server = Server.find_by(id:params[:id])
    if @server.owner != current_user
      render json: ["only the owner can delete a server"], status: 401
    else
      @server.destroy
      render json: {id: @server.id}
    end
  end

  def server_params
    params.require(:server).permit(:name, :ownerId, :public, :genre, :icon, :description, :banner).transform_keys { |key| key.to_s.underscore }
  end
end