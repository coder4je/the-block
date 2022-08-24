class IssueSerializer < ActiveModel::Serializer
  attributes :id, :issue_details, :resolved, :task_id, :issue_date

end
