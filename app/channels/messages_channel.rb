class MessagesChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find_by(id: message_params[:channel_id])
    stream_for channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def message_params
    params.transform_keys { |key| key.to_s.underscore }
  end
end