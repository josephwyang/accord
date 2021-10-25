json.partial! "friend", friend: friend
json.friendship_id friendship.id
json.extract! friendship, :accepted, :user_id, :friend_id