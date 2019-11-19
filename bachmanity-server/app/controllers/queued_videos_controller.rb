class QueuedVideosController < ApplicationController
  before_action :set_queued_video, only: [:show, :update, :destroy]
  before_action :sanitize_page_params

  # GET /queued_videos
  def index
    @queued_videos = QueuedVideo.where("lobby_id = ?", params[:lobby_id])

    render json: @queued_videos
  end

  # GET /queued_videos/1
  def show
    render json: @queued_video
  end

  # GET /queued_videos/:lobby_id/new_videos/:since
  def new_videos
    puts ("\n\nIN NEW_VIDEOS\n\n")
    params[:seqno] = params[:seqno].to_i
    @queued_videos = QueuedVideo.where("lobby_id = ? AND id > ?", params[:lobby_id], params[:seqno])

    render json: @queued_videos
  end 

  # POST /queued_videos
  def create
    @queued_video = QueuedVideo.new(queued_video_params)

    if @queued_video.save
      render json: @queued_video, status: :created, location: @lobby_queued_video
    else
      render json: @queued_video.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /queued_videos/1
  def update
    if @queued_video.update(queued_video_params)
      render json: @queued_video
    else
      render json: @queued_video.errors, status: :unprocessable_entity
    end
  end

  # DELETE /queued_videos/1
  def destroy
    @queued_video.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_queued_video
    @queued_video = QueuedVideo.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def queued_video_params
    params.require(:queued_video)
      .permit(:lobby_id, :user_id, :video)
      .reverse_merge({
        :lobby_id => params[:lobby_id],
        :user_id => current_user.id,
      })
  end

  # converts the parameters to integers
  def sanitize_page_params
    params[:lobby_id] = params[:lobby_id].to_i
  end
end
