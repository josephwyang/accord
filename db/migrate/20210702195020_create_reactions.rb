class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.integer :reactor_id, null:false
      t.integer :message_id, null:false

      t.timestamps
    end

    add_index :reactions, :reactor_id
    add_index :reactions, :message_id
  end
end
