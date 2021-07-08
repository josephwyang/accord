class MoveServerTypeColumnFromServersToMemberships < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :server_type
    add_column :servers, :public, :boolean, default:false
    add_column :memberships, :description, :string, null:false
  end
end