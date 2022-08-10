class Task < ApplicationRecord
  has_many :project_tasks
  has_many :projects, through: :project_tasks

  has_many :issues
  has_many :users, through: :issues
end
