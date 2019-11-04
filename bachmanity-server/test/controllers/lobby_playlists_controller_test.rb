require 'test_helper'

class LobbyPlaylistsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lobby_playlist = lobby_playlists(:one)
  end

  test "should get index" do
    get lobby_playlists_url, as: :json
    assert_response :success
  end

  test "should create lobby_playlist" do
    assert_difference('LobbyPlaylist.count') do
      post lobby_playlists_url, params: { lobby_playlist: { Lobby_id: @lobby_playlist.Lobby_id, User_id: @lobby_playlist.User_id, videoUrl: @lobby_playlist.videoUrl } }, as: :json
    end

    assert_response 201
  end

  test "should show lobby_playlist" do
    get lobby_playlist_url(@lobby_playlist), as: :json
    assert_response :success
  end

  test "should update lobby_playlist" do
    patch lobby_playlist_url(@lobby_playlist), params: { lobby_playlist: { Lobby_id: @lobby_playlist.Lobby_id, User_id: @lobby_playlist.User_id, videoUrl: @lobby_playlist.videoUrl } }, as: :json
    assert_response 200
  end

  test "should destroy lobby_playlist" do
    assert_difference('LobbyPlaylist.count', -1) do
      delete lobby_playlist_url(@lobby_playlist), as: :json
    end

    assert_response 204
  end
end
