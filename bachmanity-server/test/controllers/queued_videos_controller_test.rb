require 'test_helper'

class QueuedVideosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @queued_video = queued_videos(:one)
  end

  test "should get index" do
    get queued_videos_url, as: :json
    assert_response :success
  end

  test "should create queued_video" do
    assert_difference('QueuedVideo.count') do
      post queued_videos_url, params: { queued_video: { Lobby_id: @queued_video.Lobby_id, User_id: @queued_video.User_id, video: @queued_video.video } }, as: :json
    end

    assert_response 201
  end

  test "should show queued_video" do
    get queued_video_url(@queued_video), as: :json
    assert_response :success
  end

  test "should update queued_video" do
    patch queued_video_url(@queued_video), params: { queued_video: { Lobby_id: @queued_video.Lobby_id, User_id: @queued_video.User_id, video: @queued_video.video } }, as: :json
    assert_response 200
  end

  test "should destroy queued_video" do
    assert_difference('QueuedVideo.count', -1) do
      delete queued_video_url(@queued_video), as: :json
    end

    assert_response 204
  end
end
