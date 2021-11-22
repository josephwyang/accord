class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:index, :destroy]

  def index
    @users = User.all
    render :index
  end

  def show 
    @user = User.find_by(id:params[:id]) || User.find_by({ username:params[:username], tag:params[:tag] })
    render :show
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

  def update
    @user = User.find_by(id:params[:id])
    if !@user.is_password?(user_params[:current_password]) && (!user_params[:phone_number] || user_params[:phone_number] == "") && !user_params[:profile_photo] && !user_params[:last_path_visited]
      render json: ["incorrect password"], status: 401
    elsif @user.update_attributes(user_params.reject { |k, v| k == "current_password" || k == "id" || (k == "password" && v == "" )})
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def verify_phone_number
    code = rand.to_s[2..7]

    message = "Your Accord verification code is: #{code}.\n\nGithub: https://www.github.com/josephwyang\nLinkedIn: https://www.linkedin.com/in/josephwyang"

    TwilioTextMessenger.new(params[:phone_number], message).sms
    render json: { verificationCode: code }
  end

  def destroy
    @user = User.find_by(id:params[:id])
    if !@user.is_password?(params[:current_password])
      render json: ["incorrect password"], status: 401
    elsif @user.id != current_user.id
      render json: ["you can only delete an account you are logged into"], status: 401
    else
      @user.destroy
      render :show
    end
  end

  def user_params
    params.require(:user).transform_keys { |key| key.to_s.underscore }.permit(:id, :email, :username, :password, :date_of_birth, :current_password, :phone_number, :profile_photo, :last_path_visited)
  end
end