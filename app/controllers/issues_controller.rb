class IssuesController < ApplicationController
  before_action :set_issue, only: %i[ show update destroy ]
  skip_before_action :authorized_user, only: [:index, :show, :create]


  # GET /issues
  def index
    if params[:task_id]
      task = find_task
      issues = task.issues
    else
    issues = Issue.all
    end
    render json: issues, status: :ok
  end

  # GET /issues/1
  def show
    render json: @issue, status: :ok, serializer: IssueWithUsersSerializer
  end

  # POST /issues
  def create
    issue = Issue.create!(issue_params)
    UserIssue.create!(issue_id: issue.id, user_id: session[:user_id])
    render json: issue, status: :created
  end

  # PATCH/PUT /issues/1
  def update
    if @issue.update(issue_params)
      render json: @issue
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  # DELETE /issues/1
  def destroy
    @issue.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_issue
      @issue = Issue.find(params[:id])
    end

    def find_task
      Task.find(params[:task_id])
    end

    # Only allow a list of trusted parameters through.
    def issue_params
      params.permit(:issue_details, :resolved, :task_id)
    end
end
