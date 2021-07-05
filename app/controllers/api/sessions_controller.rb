class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :date)
  end
end