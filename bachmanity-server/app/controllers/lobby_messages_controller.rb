class LobbyMessagesController < ApplicationController
  before_action :set_lobby_message, only: [:show, :update, :destroy]
  before_action :require_login
  before_action :sanitize_page_params

  # GET /lobby_messages
  def index
    @lobby_messages = LobbyMessage.where("lobby_id = ?", params[:lobby_id])
    render json: @lobby_messages
  end

  # GET /lobby_messages/:lobby_id/new_messages/:since
  def new_messages
    params[:seqno] = params[:seqno].to_i

    # TODO: limit this to returning at most 100 messages if performance is poor
    results = LobbyMessage.select("lobby_messages.*, users.name AS sender_name")
      .joins(:user)
      .where("lobby_messages.lobby_id = ? AND lobby_messages.id > ?",
             params[:lobby_id], params[:seqno])

    render json: results
  end

  # GET /lobby_messages/1
  def show
    render json: @lobby_message
  end

  # POST /lobby_messages
  def create
    @lobby_message = LobbyMessage.new(lobby_message_params)

    if @lobby_message.save
      # NOTE: @lobby_lobby_message is most likely NOT correct
      render json: @lobby_message, status: :created, location: @lobby_lobby_message
    else
      render json: @lobby_message.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_lobby_message
    @lobby_message = LobbyMessage.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def lobby_message_params
    params.require(:lobby_message)
      .permit(:message, :lobby_id, :user_id)
      .reverse_merge!({
        :lobby_id => params[:lobby_id],
        :user_id => params[:user_id],
      })
  end

  # converts the parameters to integers
  def sanitize_page_params
    params[:user_id] = current_user.id
    params[:lobby_id] = params[:lobby_id].to_i
  end
end
