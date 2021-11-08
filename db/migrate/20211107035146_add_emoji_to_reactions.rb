class AddEmojiToReactions < ActiveRecord::Migration[5.2]
  def change
    add_column :reactions, :emoji, :string, null:false
  end
end
