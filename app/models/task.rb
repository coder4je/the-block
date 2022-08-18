class Task < ApplicationRecord
  belongs_to :project

  has_many :issues
  has_many :users, through: :issues
end
