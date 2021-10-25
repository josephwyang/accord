class Api::ChannelsController < ApplicationController
  def show
    @channel = Channel.includes(:messages).order("created_at DESC").find_by(id: params[:id])
    if @channel
      render :show
    else
      render json: ["invalid channel id"], status:400
    end
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status:400
    end
  end

  def update

  end

  def destroy

  end

  def channel_params
    params.require(:channel).permit(:name, :serverId).transform_keys { |key| key.to_s.underscore }
  end
end