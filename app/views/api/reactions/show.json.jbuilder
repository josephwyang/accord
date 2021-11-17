json.key_format! camelize: :lower
json.extract! reaction, :id, :reactor_id, :message_id, :emoji
json.channel_id channel.id