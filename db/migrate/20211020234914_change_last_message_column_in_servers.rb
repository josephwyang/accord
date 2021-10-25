class ChangeLastMessageColumnInServers < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :last_message
    add_column :servers, :last_message, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
