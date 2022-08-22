class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]
  skip_before_action :authorized_user

  # GET /tasks
  def index
    if params[:project_id]
      project = find_project
      tasks = project.tasks
    else
      tasks = Task.all
    end
    render json: tasks, include: :project
  end

  # GET /tasks/1
  def show
    render json: @task, include: :project
  end

  # POST /tasks
  def create
    task = Task.create!(task_params)
    render json: task, status: :created
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    def find_project
      Project.find(params[:project_id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.permit(:name, :completion, :category, :start_date, :end_date, :project_id)
    end
end
