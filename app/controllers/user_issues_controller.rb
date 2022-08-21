class UserIssuesController < ApplicationController
  before_action :set_user_issue, only: %i[ show update destroy ]

  # GET /user_issues
  def index
    @user_issues = UserIssue.all

    render json: @user_issues
  end

  # GET /user_issues/1
  def show
    render json: @user_issue
  end

  # POST /user_issues
  def create
    user_issue = UserIssue.create!(user_issue_params)

      render json: @user_issue, status: :created
 
  end

  # PATCH/PUT /user_issues/1
  def update
    if @user_issue.update(user_issue_params)
      render json: @user_issue
    else
      render json: @user_issue.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_issues/1
  def destroy
    @user_issue.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_issue
      @user_issue = UserIssue.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_issue_params
      params.permit(:user_id, :issue_id)
    end
end
