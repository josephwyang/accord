json.key_format! camelize: :lower

@gcs.each do |gc|
  json.set! gc.server.id do
    json.extract! gc.server, :id, :name, :owner_id
    json.channelId gc.channel.id
    json.icon url_for(gc.server.icon) if gc.server.icon.attached?
    json.last_message gc.server.last_message.to_i
  end
end

@dms.each do |dm|
  json.set! dm.server.id do
    json.extract! dm.server, :id
    json.channelId dm.channel.id
    json.last_message dm.server.last_message.to_i
    other_user = dm.server_members[0].id === current_user.id ? dm.server_members[1] : dm.server_members[0]
    json.user do
      json.extract! other_user, :id, :accord_tag, :username, :tag
      json.profile_photo_url url_for(other_user.profile_photo) if other_user.profile_photo.attached?
    end
  end
end