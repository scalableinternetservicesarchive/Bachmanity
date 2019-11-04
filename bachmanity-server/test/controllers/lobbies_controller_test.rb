require 'test_helper'

class LobbiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lobby = lobbies(:one)
  end

  test "should get index" do
    get lobbies_url, as: :json
    assert_response :success
  end

  test "should create lobby" do
    assert_difference('Lobby.count') do
      post lobbies_url, params: { lobby: { currentVideoUrl: @lobby.currentVideoUrl, desc: @lobby.desc, title: @lobby.title } }, as: :json
    end

    assert_response 201
  end

  test "should show lobby" do
    get lobby_url(@lobby), as: :json
    assert_response :success
  end

  test "should update lobby" do
    patch lobby_url(@lobby), params: { lobby: { currentVideoUrl: @lobby.currentVideoUrl, desc: @lobby.desc, title: @lobby.title } }, as: :json
    assert_response 200
  end

  test "should destroy lobby" do
    assert_difference('Lobby.count', -1) do
      delete lobby_url(@lobby), as: :json
    end

    assert_response 204
  end
end
