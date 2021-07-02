class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null:false, limit:32
      t.string :email, null:false
      t.string :password_digest, null:false
      t.date :date_of_birth
      t.string :tag, null:false, limit:4
      t.string :area_code
      t.string :phone_number, limit:10
      t.string :session_token, null:false

      t.timestamps
    end
    add_index :users, [:username, :tag], unique:true
    add_index :users, :email, unique:true
    add_index :users, [:phone_number, :area_code], unique:true
    add_index :users, :session_token, unique:true
  end

end