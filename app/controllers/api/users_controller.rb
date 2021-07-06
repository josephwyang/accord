class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :dateOfBirth).transform_keys { |key| key.to_s.underscore }
  end
end