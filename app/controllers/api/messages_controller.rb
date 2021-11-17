class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      channel = Channel.find_by(id: @message.channel_id)
      server = channel.server
      user = @message.sender
      server.update_attributes(last_message: DateTime.now)
      invitation = Server.find_by(id: @message.invitation)
      MessagesChannel.broadcast_to channel, Api::MessagesController.render(:show, locals: { message: @message, server: server, user: user, invitation: invitation })
    else
      render json: @message.errors.full_messages, status:400
    end
  end

  def update
    @message = Message.find_by(id: params[:id])
    if @message.invitation
      render json: ["you cannot edit invitations"]
    elsif @message.update_attributes(message_params)
      channel = Channel.find_by(id: @message.channel_id)
      MessagesChannel.broadcast_to channel, Api::MessagesController.render(:show, locals: { message: @message, server: channel.server })
    else
      render json: @message.errors.full_messages, status: 400
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    channel = Channel.find_by(id: @message.channel_id)
    @message.destroy
    MessagesChannel.broadcast_to channel, { message_id: @message.id, channel_id: channel.id }.transform_keys { |key| key.to_s.camelize(:lower) }
  end

  def message_params
    params.require(:message).transform_keys { |key| key.to_s.underscore }.permit(:sender_id, :channel_id, :replied_message_id, :body, :edited, :invitation)
  end
end