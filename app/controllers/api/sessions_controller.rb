class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      user_params[:identifier],
      user_params[:password]
    )
    debugger
    if @user
      log_in!(@user)
      render :show
    else
      debugger
      render json: ["Login or password is invalid"], status: 401
    end
  end

  def destroy
    if logged_in?
      log_out!
      render json: {}
    else
      render json: ["Not logged in"], status: 404
    end
  end

  def user_params
    params.require(:user).permit(:identifier, :password)
  end
end