class RemoveUserIdFromIssues < ActiveRecord::Migration[7.0]
  def change
    remove_column :issues, :user_id, :integer
  end
end
