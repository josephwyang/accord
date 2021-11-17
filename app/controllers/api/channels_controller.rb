class Api::ChannelsController < ApplicationController
  def show
    @channel = Channel.includes(:messages, :reactions, :invited_servers).order("messages.created_at DESC").find_by(id: params[:id])
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
    @channel = Channel.find_by(id:params[:id])
    if current_user.memberships.to_a.none? { |membership| membership.server.channels.to_a.any? { |channel| channel.id == @channel.id } }
      render json: ["only a member can rename a channel"], status: 401
    elsif @channel.update_attributes(channel_params)
      render :updated_show
    else
      render json: @channel.errors.full_messages, status: 400
    end
  end

  def destroy
    channel = Channel.find_by(id:params[:id])
    if current_user.memberships.to_a.none? { |membership| membership.server.channels.to_a.any? { |channel| channel.id == params[:id].to_i } }
      render json: ["only a member can delete a channel"], status: 401
    else
      channel.destroy
      render json: channel.id
    end
  end

  def channel_params
    params.require(:channel).transform_keys { |key| key.to_s.underscore }.permit(:name, :server_id)
  end
end