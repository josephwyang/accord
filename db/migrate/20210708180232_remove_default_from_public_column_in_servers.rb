class RemoveDefaultFromPublicColumnInServers < ActiveRecord::Migration[5.2]
  def change
    change_column_default :servers, :public, nil
    change_column_null :servers, :public, false
  end
end
