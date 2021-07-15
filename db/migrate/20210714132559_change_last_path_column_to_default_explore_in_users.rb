class ChangeLastPathColumnToDefaultExploreInUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :last_path_visited
    add_column :users, :last_path_visited, :string, default: "/explore"
  end
end
