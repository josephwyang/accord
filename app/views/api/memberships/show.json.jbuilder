json.key_format! camelize: :lower
json.member do
  json.extract! @member, :id, :accord_tag, :username, :tag
  json.profile_photo_url url_for(@member.profile_photo) if @member.profile_photo.attached?
end

json.server do
  json.extract! @server, :id, :name, :owner_id, :public, :genre, :description
  json.icon url_for(@server.icon) if @server.icon.attached?
  json.banner url_for(@server.banner) if @server.banner.attached?
end