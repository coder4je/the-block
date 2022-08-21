class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :phone_number, :picture

  has_many :projects
end
