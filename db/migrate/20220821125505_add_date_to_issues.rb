class AddDateToIssues < ActiveRecord::Migration[7.0]
  def change
    add_column :issues, :issue_date, :date
  end
end
