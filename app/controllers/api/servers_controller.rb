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
    @server = Server.includes(:channels).find_by(id: params[:id])
    render :show
  end

  def create
    @server = Server.new(server_params)
    if @server.save
      Membership.create!(user_id: current_user.id, server_id: @server.id, description: "server")
      Channel.create!(server_id: @server.id, name:"general")
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
      redirect_to servers_url
    end
  end

  def server_params
    params.require(:server).permit(:name, :owner_id, :public, :genre, :photo)
  end
end