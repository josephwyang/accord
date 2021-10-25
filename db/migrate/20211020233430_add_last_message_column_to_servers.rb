class AddLastMessageColumnToServers < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :last_message, :int, default:DateTime.now.to_i
  end
end