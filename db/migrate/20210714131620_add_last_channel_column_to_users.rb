class AddLastChannelColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_path_visited, :string, null:false
  end
end