require "test_helper"

class UserIssuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_issue = user_issues(:one)
  end

  test "should get index" do
    get user_issues_url, as: :json
    assert_response :success
  end

  test "should create user_issue" do
    assert_difference("UserIssue.count") do
      post user_issues_url, params: { user_issue: { issue_id: @user_issue.issue_id, user_id: @user_issue.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show user_issue" do
    get user_issue_url(@user_issue), as: :json
    assert_response :success
  end

  test "should update user_issue" do
    patch user_issue_url(@user_issue), params: { user_issue: { issue_id: @user_issue.issue_id, user_id: @user_issue.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy user_issue" do
    assert_difference("UserIssue.count", -1) do
      delete user_issue_url(@user_issue), as: :json
    end

    assert_response :no_content
  end
end
