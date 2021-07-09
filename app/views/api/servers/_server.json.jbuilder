json.key_format! camelize: :lower
json.extract! server, :id, :name, :owner_id, :public, :genre
json.photo url_for(server.photo) if server.photo.attached?