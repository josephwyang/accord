json.key_format! camelize: :lower
json.channel do
  json.partial! "channel", channel:@channel
end

json.messages do
  @channel.messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :sender_id, :channel_id, :replied_message_id
      json.date message.created_at.strftime("%D")
      json.time message.created_at.strftime("%I:%M%p")
    end
  end
end