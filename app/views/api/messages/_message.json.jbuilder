json.key_format! camelize: :lower
json.extract! message, :id, :body, :sender_id, :channel_id, :replied_message_id
json.date message.created_at.strftime("%D")
json.time message.created_at.strftime("%I:%M%p")
json.seconds message.created_at.to_i