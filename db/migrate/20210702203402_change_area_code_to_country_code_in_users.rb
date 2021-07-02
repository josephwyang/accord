class ChangeAreaCodeToCountryCodeInUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :area_code, :country_code
  end
end
