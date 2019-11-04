class LobbyPlaylistsController < ApplicationController
  before_action :set_lobby_playlist, only: [:show, :update, :destroy]

  # GET /lobby_playlists
  def index
    @lobby_playlists = LobbyPlaylist.all

    render json: @lobby_playlists
  end

  # GET /lobby_playlists/1
  def show
    render json: @lobby_playlist
  end

  # POST /lobby_playlists
  def create
    @lobby_playlist = LobbyPlaylist.new(lobby_playlist_params)

    if @lobby_playlist.save
      render json: @lobby_playlist, status: :created, location: @lobby_playlist
    else
      render json: @lobby_playlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lobby_playlists/1
  def update
    if @lobby_playlist.update(lobby_playlist_params)
      render json: @lobby_playlist
    else
      render json: @lobby_playlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lobby_playlists/1
  def destroy
    @lobby_playlist.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lobby_playlist
      @lobby_playlist = LobbyPlaylist.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lobby_playlist_params
      params.require(:lobby_playlist).permit(:videoUrl, :Lobby_id, :User_id)
    end
end
