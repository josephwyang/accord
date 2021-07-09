class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def require_logged_out
    redirect_to api_user_url(current_user.id) if logged_in?
  end

  def require_logged_in
    redirect_to api_session_url unless logged_in?
  end

  def log_in!(user)
    return nil unless user
    session[:session_token] = user.reset_session_token!
  end

  def log_out!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
end