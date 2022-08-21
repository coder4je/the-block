class IssueSerializer < ActiveModel::Serializer
  attributes :id, :issue_details, :resolved, :task_id

  belongs_to :task
  has_many :user_issues

end
