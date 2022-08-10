class Project < ApplicationRecord
  has_many :user_projects
  has_many :users, through: :user_projects

  has_many :project_tasks
  has_many :tasks, through: :project_tasks
end
