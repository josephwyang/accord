class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.integer :owner_id, null:false
      t.string :name, null:false, limit:100
      t.boolean :public, null:false
      t.string :genre

      t.timestamps
    end

    add_index :servers, :owner_id, unique:true
  end
end