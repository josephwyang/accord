json.key_format! camelize: :lower
json.extract! friend, :id, :accord_tag, :username, :tag
json.profile_photo_url url_for(friend.profile_photo) if friend.profile_photo.attached?