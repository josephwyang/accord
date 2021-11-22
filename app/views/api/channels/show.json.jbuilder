json.key_format! camelize: :lower
json.channel do
  json.partial! "channel", channel:@channel
end

json.messages do
  @channel.messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :sender_id, :channel_id, :replied_message_id, :edited
      json.date message.created_at.localtime.strftime("%D")
      json.time message.created_at.localtime.strftime("%I:%M%p")
      json.seconds message.created_at.localtime.to_i
      json.invitation message.invitation
      if message.invitation
        json.server do
          json.name message.invited_server.name
          json.icon url_for(message.invited_server.icon) if message.invited_server.icon.attached?
        end
      end

      json.reactions do
        message.reactions.each do |reaction|
          json.set! reaction.id do
            json.extract! reaction, :id, :reactor_id, :message_id, :emoji
          end
        end
      end

    end
  end
end