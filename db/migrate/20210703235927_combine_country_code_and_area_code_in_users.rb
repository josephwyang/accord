class CombineCountryCodeAndAreaCodeInUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :country_code
    remove_column :users, :phone_number
    add_column :users, :phone_number, :string, limit:15
    add_index :users, :phone_number, unique:true
  end
end