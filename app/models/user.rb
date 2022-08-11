class User < ApplicationRecord
  has_many :user_projects
  has_many :projects, through: :user_projects

  has_many :issues
  has_many :tasks, through: :issues

  has_secure_password

  validates :email, presence: true, uniqueness: true
end
