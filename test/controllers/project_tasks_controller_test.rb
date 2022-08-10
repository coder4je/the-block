require "test_helper"

class ProjectTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @project_task = project_tasks(:one)
  end

  test "should get index" do
    get project_tasks_url, as: :json
    assert_response :success
  end

  test "should create project_task" do
    assert_difference("ProjectTask.count") do
      post project_tasks_url, params: { project_task: { project_id: @project_task.project_id, task_id: @project_task.task_id } }, as: :json
    end

    assert_response :created
  end

  test "should show project_task" do
    get project_task_url(@project_task), as: :json
    assert_response :success
  end

  test "should update project_task" do
    patch project_task_url(@project_task), params: { project_task: { project_id: @project_task.project_id, task_id: @project_task.task_id } }, as: :json
    assert_response :success
  end

  test "should destroy project_task" do
    assert_difference("ProjectTask.count", -1) do
      delete project_task_url(@project_task), as: :json
    end

    assert_response :no_content
  end
end
