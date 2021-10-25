json.key_format! camelize: :lower

json.friends do
  @initiated_friendships.each do |friendship|
    json.set! friendship.id do
      json.partial! "friend", friend: friendship.friend
      json.friendship_id friendship.id
    end
  end

  @received_friendships.each do |friendship|
    json.set! friendship.id do
      json.partial! "friend", friend: friendship.user
      json.friendship_id friendship.id
    end
  end
end

json.friend_requests do
  @friend_requests.each do |friendship|
    json.set! friendship.id do
      json.partial! "friend", friend: friendship.user
      json.friendship_id friendship.id
      
    end
  end
end

json.pending_friends do
  @pending_friends.each do |friendship|
    json.set! friendship.id do
      json.partial! "friend", friend: friendship.friend
      json.friendship_id friendship.id
    end
  end
end