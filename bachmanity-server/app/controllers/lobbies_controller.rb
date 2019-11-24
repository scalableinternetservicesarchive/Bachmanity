class LobbiesController < ApplicationController
  before_action :set_lobby, only: [:show, :destroy]
  before_action :require_login

  # GET /lobbies
  def index
    @lobbies = Lobby.all

    json = Rails.cache.fetch("posts", expires_in: 10) do
      results = ActiveRecord::Base.connection.execute("
        SELECT 
          lobbies.id AS id, 
          lobbies.title AS title,
          lobbies.desc AS desc,
          queued_videos.video AS currentVideoId
        FROM lobbies
        JOIN queued_videos ON queued_videos.lobby_id = lobbies.id 
        WHERE queued_videos.created_at = (
            SELECT MAX(queued_videos.created_at) 
            FROM queued_videos 
            WHERE queued_videos.lobby_id = lobbies.id 
        );
      ").to_json
    end

    render json: json
  end

  # GET /lobbies/1
  def show
    render json: @lobby
  end

  # POST /lobbies
  def create
    Lobby.transaction do
      QueuedVideo.transaction do
        @lobby = Lobby.new(lobby_params)

        if not @lobby.save
          render json: @lobby.errors, status: :unprocessable_entity
          raise ActiveRecord::Rollback, "failed to save the lobby"
        else
          @first_queued_video = QueuedVideo.new({
            user: current_user,
            lobby: @lobby,
            video: params[:currentVideoId],
          })
          if not @first_queued_video.save
            render json: @first_queued_video.errors, status: :unprocessable_entity
            raise ActiveRecord::Rollback, "failed to save the queue'd video"
          end
          render json: @lobby, status: :created, location: @lobby
        end
      end
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
    params.require(:lobby).permit(:title, :desc, :currentVideoId)
  end
end
