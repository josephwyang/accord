json.set! user.id do
  json.extract! user, :username, :accord_tag
end