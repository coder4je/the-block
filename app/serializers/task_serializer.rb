class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :completion, :category, :start_date, :end_date, :project_id
end
