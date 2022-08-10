class User < ApplicationRecord
  has_many :user_projects
  has_many :projects, through: :user_projects

  has_many :issues
  has_many :tasks, through: :issues
end
