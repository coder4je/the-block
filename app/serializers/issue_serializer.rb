class IssueSerializer < ActiveModel::Serializer
  attributes :id, :issue_details, :resolved, :user_id, :task_id
end
