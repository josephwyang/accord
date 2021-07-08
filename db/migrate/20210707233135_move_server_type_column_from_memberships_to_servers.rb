class MoveServerTypeColumnFromMembershipsToServers < ActiveRecord::Migration[5.2]
  def change
    remove_column :memberships, :server_type
    remove_column :servers, :public
    add_column :servers, :server_type, :string, null:false
  end
end