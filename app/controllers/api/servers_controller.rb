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
      is_gc = int?(@server.genre[0])
      members = is_gc ? @server.members : nil
      channel = is_gc ? @server.channels[0] : nil
      render :show, locals: { server: @server, is_gc: is_gc, members: members, channel: channel }
    else
      render json: ["invalid server id"], status:400
    end
  end

  def create
    @server = Server.new(server_params)
    if @server.save

      # direct messages
      if server_params[:genre] == "dm" || int?(server_params[:genre][0])
        @channel = Channel.create!(server_id: @server.id, name: server_params[:genre] == "dm" ? "dm" : "gc")
        
        if server_params[:genre] == "dm"
          Membership.create!(user_id: current_user.id, server_id: @server.id, description: "dm")
          @other_user = Membership.create!(user_id: @server.owner_id, server_id: @server.id, description: "dm").user
        else
          @members = server_params[:genre].split(",").map { |member_id| Membership.create!(user_id: member_id, server_id: @server.id, description: "gc").user }
        end

      # servers
      else
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
      end

      if @members
        @members.each do |member|
          DmsChannel.broadcast_to member, Api::ServersController.render(:show, locals: { server: @server, channel: @channel, members: @members, is_gc: int?(@server.genre[0]) })
        end
      elsif @other_user
        DmsChannel.broadcast_to current_user, Api::ServersController.render(:show, locals: { server: @server, channel: @channel, other_user: @other_user })
        DmsChannel.broadcast_to @other_user, Api::ServersController.render(:show, locals: { server: @server, channel: @channel, other_user: current_user })
      else
        DmsChannel.broadcast_to current_user, Api::ServersController.render(:show, locals: { server: @server, channel: @channel, is_gc: int?(@server.genre[0]) })
      end
      render :show, locals: { server: @server, channel: @channel, is_gc: int?(@server.genre[0]) }
    else
      render json: @server.errors.full_messages, status:400
    end
  end

  def update
    @server = Server.includes(:members).find_by(id:params[:id])
    is_gc = int?(@server.genre[0])
    if @server.owner != current_user && !is_gc
      render json: ["only the owner can modify a server"], status: 401
    elsif @server.update_attributes(server_params)
      @server.members.each do |member|
        DmsChannel.broadcast_to member, Api::ServersController.render(:updated_show, locals: { server: @server, is_gc: is_gc })
      end
    else
      render json: @server.errors.full_messages, status: 400
    end
  end

  def destroy
    @server = Server.includes(:members).find_by(id:params[:id])
    if @server.owner.id != current_user.id && @server.genre != "dm" && !int?(@server.genre[0])
      render json: ["only the owner can delete a server"], status: 401
    elsif current_user.memberships.to_a.none? { |membership| membership.server_id == @server.id }
      render json: ["only a member can delete a direct message"], status: 401
    else
      @server.destroy
      @server.members.each do |member|
        DmsChannel.broadcast_to member, { server_id: @server.id }.transform_keys { |key| key.to_s.camelize(:lower) }
      end
    end
  end

  def server_params
    params.require(:server).transform_keys { |key| key.to_s.underscore }.permit(:name, :owner_id, :public, :genre, :icon, :description, :banner)
  end

  def int? string
    true if Integer(string) rescue false
  end
end