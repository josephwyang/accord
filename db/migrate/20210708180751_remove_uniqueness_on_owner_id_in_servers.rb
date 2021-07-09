class RemoveUniquenessOnOwnerIdInServers < ActiveRecord::Migration[5.2]
  def change
    remove_index :servers, :owner_id
    add_index :servers, :owner_id
  end
end
