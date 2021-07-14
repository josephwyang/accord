json.partial! "user", user:@user
json.extract! @user, :email, :phone_number