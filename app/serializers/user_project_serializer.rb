class UserProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :user_id, :member_email

  # validates :email, uniqueness: true

end
