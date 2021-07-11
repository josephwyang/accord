class Api::ServersController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @server.errors.full_messages, status:400
    end
  end

  def update

  end

  def destroy

  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
end