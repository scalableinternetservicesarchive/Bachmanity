class LobbiesController < ApplicationController
  before_action :set_lobby, only: [:show, :update, :destroy]

  # GET /lobbies
  def index
    @lobbies = Lobby.all

    render json: @lobbies
  end

  # GET /lobbies/1
  def show
    render json: @lobby
  end

  # POST /lobbies
  def create
    @lobby = Lobby.new(lobby_params)

    if @lobby.save
      render json: @lobby, status: :created, location: @lobby
    else
      render json: @lobby.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lobbies/1
  def update
    if @lobby.update(lobby_params)
      render json: @lobby
    else
      render json: @lobby.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lobbies/1
  def destroy
    @lobby.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lobby
      @lobby = Lobby.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lobby_params
      params.require(:lobby).permit(:title, :desc, :currentVideoUrl)
    end
end
