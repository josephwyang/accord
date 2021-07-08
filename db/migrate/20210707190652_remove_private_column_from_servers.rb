class RemovePrivateColumnFromServers < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :private
  end
end
