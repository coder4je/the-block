Rails.application.routes.draw do
  resources :project_tasks
  resources :issues
  resources :tasks
  resources :user_projects
  resources :projects
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
