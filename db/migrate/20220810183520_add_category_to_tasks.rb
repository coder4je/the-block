class AddCategoryToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :catagory, :string
  end
end
