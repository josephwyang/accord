json.key_format! camelize: :lower
json.extract! @user, :id, :accord_tag, :username, :tag, :email, :phone_number, :last_path_visited
json.profile_photo_url url_for(@user.profile_photo) if @user.profile_photo.attached?