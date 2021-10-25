class CreateDms < ActiveRecord::Migration[5.2]
  def change
    create_table :dms do |t|
      t.integer :user_id, null:false
      t.integer :friend_id, null:false

      t.timestamps
    end

    add_index :dms, [:user_id, :friend_id], unique:true
    add_index :dms, :friend_id
  end
end