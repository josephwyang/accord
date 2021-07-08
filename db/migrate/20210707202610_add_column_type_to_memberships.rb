class AddColumnTypeToMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :memberships, :type, :string, null:false
  end
end