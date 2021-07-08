class RenameColumnTypeToServerTypeInMemberships < ActiveRecord::Migration[5.2]
  def change
    rename_column :memberships, :type, :server_type
  end
end