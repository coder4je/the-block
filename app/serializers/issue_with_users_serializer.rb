class IssueWithUsersSerializer < ActiveModel::Serializer
  attributes :id, :issue_details, :resolved, :task_id
  
  has_many :users
end
