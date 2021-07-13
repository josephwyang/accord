json.key_format! camelize: :lower
json.extract! server, :id, :name, :owner_id, :public, :genre, :description
json.icon url_for(server.icon) if server.icon.attached?
json.banner url_for(server.banner) if server.banner.attached?