json.partial! "message", message:message
json.server do
  json.id server.id
  json.last_message server.last_message.to_i
end