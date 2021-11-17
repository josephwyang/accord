json.partial! "message", message:message
json.server do
  json.id server.id
  json.last_message server.last_message.to_i
  if message.invitation
    json.name invitation.name
    json.icon url_for(invitation.icon) if invitation.icon.attached?
  end
end

json.username user.username
json.profile_photo_url url_for(user.profile_photo) if user.profile_photo.attached?