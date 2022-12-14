class UserProjectsController < ApplicationController
  before_action :set_user_project, only: %i[ show update destroy ]
  skip_before_action :authorized_user

  # GET /user_projects
  def index
    user_projects = UserProject.all
    render json: user_projects, status: :ok
  end

  # GET /user_projects/1
  def show
    render json: @user_project
  end

  # POST /user_projects
  def create
    user_project = UserProject.create!(user_project_params)
    render json: user_project, status: :created
  end

  # PATCH/PUT /user_projects/1
  def update
    if @user_project.update(user_project_params)
      render json: @user_project
    else
      render json: @user_project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_projects/1
  def destroy
    @user_project.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_project
      @user_project = UserProject.find(params[:id])
    end

    def find_user
      User.find([params[:email]])
    end

    # Only allow a list of trusted parameters through.
    def user_project_params
      params.permit(:project_id, :user_id, :member_email)
    end
end
