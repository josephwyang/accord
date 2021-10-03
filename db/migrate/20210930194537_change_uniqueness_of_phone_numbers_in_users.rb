class ChangeUniquenessOfPhoneNumbersInUsers < ActiveRecord::Migration[5.2]
  def change
    remove_index :users, :phone_number
    add_index :users, :phone_number, unique:true, where: "phone_number != ''"
  end
end
