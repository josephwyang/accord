class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :sender_id, null:false
      t.integer :replied_message_id
      t.integer :chat_id, null:false
      t.string :chat_type, null:false
      t.text :body, null:false

      t.timestamps
    end

    add_index :messages, :sender_id
    add_index :messages, :replied_message_id
    add_index :messages, :chat_id
  end
end
