class UserProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :user_id
end
