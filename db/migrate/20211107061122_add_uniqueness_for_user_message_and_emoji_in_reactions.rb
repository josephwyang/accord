class AddUniquenessForUserMessageAndEmojiInReactions < ActiveRecord::Migration[5.2]
  def change
    add_index :reactions, [:message_id, :reactor_id, :emoji], unique:true
  end
end