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

  post "/api/signup", to: "users#create"
  get "/api/users", to: "users#show"
  post "/api/login", to: "sessions#create"
  delete "/api/logout", to: "sessions#destroy"
end
