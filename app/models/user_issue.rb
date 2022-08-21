class UserIssue < ApplicationRecord
  belongs_to :user
  belongs_to :issue
end
