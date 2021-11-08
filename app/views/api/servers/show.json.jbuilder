json.key_format! camelize: :lower

case @server.genre
when "dm"
  json.server do
    json.extract! @server, :id, :genre
    json.channelId @channel ? @channel.id : @server.channels[0].id
    json.last_message @server.last_message ? @server.last_message.to_i : DateTime.now.to_i
    json.user do
      other_user = @other_user || (@server.members[0].id == current_user.id ? @server.members[1] : @server.members[0])
      json.extract! other_user, :id, :accord_tag, :username, :tag
      json.profile_photo_url url_for(other_user.profile_photo) if other_user.profile_photo.attached?
    end
  end
when "gc"
  json.server do
    json.extract! @server, :id, :name, :owner_id, :genre
    json.channelId @channel ? @channel.id : @server.channels[0].id
    json.icon url_for(@server.icon) if @server.icon.attached?
    json.last_message @server.last_message ? @server.last_message.to_i : DateTime.now.to_i
  end
else
  json.server do
    json.partial! "server", server:@server
  end
end

json.channels do
  @server.channels.each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :name, :server_id
    end
  end
end

json.members do
  @server.members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :accord_tag, :username, :tag
      json.profile_photo_url url_for(member.profile_photo) if member.profile_photo.attached?
    end
  end
end

if @server.genre == "dm" || @server.genre == "gc"
  json.messages do
    @server.messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :body, :sender_id, :channel_id, :replied_message_id, :edited
        json.date message.created_at.strftime("%D")
        json.time message.created_at.strftime("%I:%M%p")
        json.seconds message.created_at.to_i

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
end