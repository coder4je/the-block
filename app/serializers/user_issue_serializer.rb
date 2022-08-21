class UserIssueSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :issue_id
end
