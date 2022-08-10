class CreateIssues < ActiveRecord::Migration[7.0]
  def change
    create_table :issues do |t|
      t.string :issue_details
      t.boolean :resolved
      t.integer :user_id
      t.integer :task_id

      t.timestamps
    end
  end
end
