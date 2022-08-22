class AddMemberEmailToUserProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :user_projects, :member_email, :string
  end
end
