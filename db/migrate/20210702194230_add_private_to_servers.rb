class AddPrivateToServers < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :private, :boolean, null:false
  end
end