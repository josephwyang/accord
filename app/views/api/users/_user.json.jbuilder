json.set! user.id do
  json.key_format! camelize: :lower
  json.extract! user, :id, :accord_tag
end