json.key_format! camelize: :lower

case @server.genre
when "gc"
  json.extract! @server, :id, :name, :owner_id, :genre
  json.channelId @server.channels[0].id
  json.icon url_for(@server.icon) if @server.icon.attached?
  json.last_message @server.last_message ? @server.last_message.to_i : DateTime.now.to_i
else
  json.partial! "server", server:@server
end