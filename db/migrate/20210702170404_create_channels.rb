class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.integer :server_id, null:false
      t.string :name, null:false, limit:100

      t.timestamps
    end
    
    add_index :channels, :server_id
  end
end