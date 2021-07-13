class AddDescriptionColumnToServers < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :description, :string, limit:255
  end
end
