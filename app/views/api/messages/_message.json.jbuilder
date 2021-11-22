json.key_format! camelize: :lower
json.extract! message, :id, :body, :sender_id, :channel_id, :replied_message_id, :edited
json.date message.created_at.localtime.strftime("%D")
json.time message.created_at.localtime.strftime("%I:%M%p")
json.seconds message.created_at.localtime.to_i
json.invitation message.invitation