class Api::ServersController < ApplicationController
  def create
    @server = Server.new(server_params)
    if @server.save
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
    params.require(:server).permit(:name, :owner_id, :public, :genre)
  end
end