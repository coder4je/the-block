class AddProjectIdToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :project_id, :integer
  end
end
