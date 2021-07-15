class MessagesChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find_by(id: messageParams[:channel_id])
    stream_for channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def messageParams
    params.transform_keys { |key| key.to_s.underscore }
  end
end