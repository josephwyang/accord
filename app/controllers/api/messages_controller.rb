class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(messageParams)
    if @message.save
      channel = Channel.find_by(id: @message.channel_id)
      MessagesChannel.broadcast_to channel, Api::MessagesController.render(:show, locals: { message: @message })
    else
      render json: @message.errors.full_messages, status:400
    end
  end

  def messageParams
    params.require(:message).transform_keys { |key| key.to_s.underscore }.permit(:sender_id, :channel_id, :replied_message_id, :body)
  end
end