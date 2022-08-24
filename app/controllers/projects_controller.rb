class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]
  skip_before_action :authorized_user, only: [:index, :show, :create, :destroy]
  
  # GET /projects
  def index
    user = User.find(session[:user_id])
    user_projects = user.projects.uniq
    render json: user_projects
  end

  # GET /projects/1
  def show
    render json: @project, include: :users
  end

  # POST /projects
  def create
    project = Project.create!(project_params)
    UserProject.create!(project_id: project.id, user_id: session[:user_id])
    render json: project, status: :created
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update!(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    if find_user_project
    @project.destroy
    find_user_project.destroy
    else
      @project.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    def find_user_project
      UserProject.find_by(project_id: params[:project_id])
    end


    # Only allow a list of trusted parameters through.
    def project_params
      params.permit(:name, :description, :start_date, :end_date)
    end
end
