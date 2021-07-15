json.partial! "user", user:@user
json.extract! @user, :email, :phone_number, :last_path_visited