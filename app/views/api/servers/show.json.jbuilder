json.key_format! camelize: :lower

json.server do
  json.partial! "server", server:@server
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