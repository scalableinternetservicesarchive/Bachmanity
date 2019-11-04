class LobbyMessagesController < ApplicationController
  before_action :set_lobby_message, only: [:show, :update, :destroy]

  # GET /lobby_messages
  def index
    @lobby_messages = LobbyMessage.all

    render json: @lobby_messages
  end

  # GET /lobby_messages/1
  def show
    render json: @lobby_message
  end

  # POST /lobby_messages
  def create
    @lobby_message = LobbyMessage.new(lobby_message_params)

    if @lobby_message.save
      render json: @lobby_message, status: :created, location: @lobby_message
    else
      render json: @lobby_message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lobby_messages/1
  def update
    if @lobby_message.update(lobby_message_params)
      render json: @lobby_message
    else
      render json: @lobby_message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lobby_messages/1
  def destroy
    @lobby_message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lobby_message
      @lobby_message = LobbyMessage.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lobby_message_params
      params.require(:lobby_message).permit(:message, :Lobby_id, :User_id)
    end
end
