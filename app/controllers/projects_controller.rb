class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]
  skip_before_action :authorized_user, only: [:index, :show, :create]
  
  # GET /projects
  def index
    @projects = Project.all

    render json: @projects
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    project = Project.create!(project_params)
    render json: project, status: :created
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.permit(:name, :description, :start_date, :end_date)
    end
end
