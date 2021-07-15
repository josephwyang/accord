class ChangeChatColumnToChannelIdInMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :chat_id
    remove_column :messages, :chat_type
    add_column :messages, :channel_id, :integer, null:false
    add_index :messages, :channel_id
  end
end