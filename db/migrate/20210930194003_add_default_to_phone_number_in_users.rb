class AddDefaultToPhoneNumberInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :phone_number, :string, default: "", limit: 12
  end
end
