class AddAcceptedColumnToFriendships < ActiveRecord::Migration[5.2]
  def change
    add_column :friendships, :accepted, :boolean, default:false, null:false
  end
end
