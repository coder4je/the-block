class UsersController < ApplicationController
  before_action :set_user, only: %i[ update destroy ]  
  skip_before_action :authorized_user, only: [:index, :show, :create]

  # GET /api/users
  def index
    @users = User.all

    render json: @users

  end

  # GET /api/users/1
  def show
    render json: current_user, status: :ok, serializer: UserWithProjectsSerializer
  end

  # POST /api/users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  # PATCH/PUT /api/users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :email, :password, :phone_number, :picture)
    end
end
