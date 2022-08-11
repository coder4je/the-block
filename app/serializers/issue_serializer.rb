class IssueSerializer < ActiveModel::Serializer
  attributes :id, :issue_details, :user_id, :task_id
end
