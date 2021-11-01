class AddEditedColumnToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :edited, :boolean, default:false, null:false
  end
end