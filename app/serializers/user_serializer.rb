class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :phone_number, :picture, :projects
end
