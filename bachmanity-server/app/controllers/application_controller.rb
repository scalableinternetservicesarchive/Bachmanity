class ApplicationController < ActionController::API
  include ActionController::Helpers
  helper_method :current_user
  helper_method :require_login 

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end 

  def require_login 
    if current_user.nil?
      return render json: {
        :error => "please login"
      }, status: :unauthorized
    end 
  end 
end
