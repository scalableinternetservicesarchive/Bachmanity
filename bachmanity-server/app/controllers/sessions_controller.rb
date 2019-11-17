class SessionsController < ApplicationController
  def new
  end

  def create
    puts "authenticating user #{params[:name]} with password #{params[:password]}"

    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      puts "\tauthed successfully!"
      session[:user_id] = user.id
      puts "\tsession: #{session}"
      render json: user
    else
      render json: nil 
    end
  end
  
  def show
    puts "showing the current loggedin user's info"
    puts "\tsession: #{session}"
    render json: current_user
  end

  def destroy
    session[:user_id] = nil
    render json: nil 
  end
end
