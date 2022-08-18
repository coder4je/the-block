class DropProjectTasksTable < ActiveRecord::Migration[7.0]
  def change
    def up
      drop_table :project_tasks
    end

    def down
      fail ActiveRecord::IrreversibleMigration    
    end
  end
end
