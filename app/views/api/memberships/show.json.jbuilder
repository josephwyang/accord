json.key_format! camelize: :lower
json.extract! @member, :id, :accord_tag, :username, :tag
json.profile_photo_url url_for(@member.profile_photo) if @member.profile_photo.attached?