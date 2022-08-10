require "test_helper"

class IssuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @issue = issues(:one)
  end

  test "should get index" do
    get issues_url, as: :json
    assert_response :success
  end

  test "should create issue" do
    assert_difference("Issue.count") do
      post issues_url, params: { issue: { issue_details: @issue.issue_details, resolved: @issue.resolved, task_id: @issue.task_id, user_id: @issue.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show issue" do
    get issue_url(@issue), as: :json
    assert_response :success
  end

  test "should update issue" do
    patch issue_url(@issue), params: { issue: { issue_details: @issue.issue_details, resolved: @issue.resolved, task_id: @issue.task_id, user_id: @issue.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy issue" do
    assert_difference("Issue.count", -1) do
      delete issue_url(@issue), as: :json
    end

    assert_response :no_content
  end
end
