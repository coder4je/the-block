class ProjectTasksController < ApplicationController
  before_action :set_project_task, only: %i[ show update destroy ]

  # GET /project_tasks
  def index
    @project_tasks = ProjectTask.all

    render json: @project_tasks
  end

  # GET /project_tasks/1
  def show
    render json: @project_task
  end

  # POST /project_tasks
  def create
    @project_task = ProjectTask.new(project_task_params)

    if @project_task.save
      render json: @project_task, status: :created, location: @project_task
    else
      render json: @project_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /project_tasks/1
  def update
    if @project_task.update(project_task_params)
      render json: @project_task
    else
      render json: @project_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /project_tasks/1
  def destroy
    @project_task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_task
      @project_task = ProjectTask.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_task_params
      params.require(:project_task).permit(:project_id, :task_id)
    end
end
