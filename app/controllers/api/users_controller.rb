class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:index, :destroy]

  def index
    @users = User.all
    render :index
  end

  def show 
    @user = User.find_by(id:params[:id])
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
    if !@user.is_password?(user_params[:current_password]) && @user.phone_number == user_params[:phone_number]
      render json: ["incorrect password"], status: 401
    elsif @user.update_attributes(user_params.reject { |k, v| k == "current_password" || k == "id" || (k == "password" && v == "" )})
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def verify_phone_number
    code = rand.to_s[2..7]

    message = "Your Accord verification code is: #{code}.\n
    LinkedIn:\nhttps://www.linkedin.com/in/josephwyang\n
    Github:\nhttps://www.github.com/josephwyang\n
    AngelList:\nhttps://angel.co/u/josephwyang"

    TwilioTextMessenger.new("+13478662258", message).sms
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
    params.require(:user).permit(:id, :email, :username, :password, :dateOfBirth, :currentPassword, :phoneNumber, :profilePhoto).transform_keys { |key| key.to_s.underscore }
  end
end