class ChangeUniquenessOnFriendIdInFriendships < ActiveRecord::Migration[5.2]
  def change
    remove_index :friendships, :friend_id
    add_index :friendships, :friend_id
  end
end
