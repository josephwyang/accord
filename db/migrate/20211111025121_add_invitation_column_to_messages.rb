class AddInvitationColumnToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :invitation, :integer
  end
end