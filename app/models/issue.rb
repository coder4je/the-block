class Issue < ApplicationRecord
  belongs_to :task

  has_many :user_issues
  has_many :users, through: :user_issues
end
