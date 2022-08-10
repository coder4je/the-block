class RenameCatagoryToCategoryInTasks < ActiveRecord::Migration[7.0]
  def up
    rename_column :tasks, :catagory, :category
  end
end
