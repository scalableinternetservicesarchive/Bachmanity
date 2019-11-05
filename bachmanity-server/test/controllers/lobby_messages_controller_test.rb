require 'test_helper'

class LobbyMessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lobby_message = lobby_messages(:one)
  end

  test "should get index" do
    get lobby_messages_url, as: :json
    assert_response :success
  end

  test "should create lobby_message" do
    assert_difference('LobbyMessage.count') do
      post lobby_messages_url, params: { lobby_message: { Lobby_id: @lobby_message.Lobby_id, User_id: @lobby_message.User_id, message: @lobby_message.message } }, as: :json
    end

    assert_response 201
  end

  test "should show lobby_message" do
    get lobby_message_url(@lobby_message), as: :json
    assert_response :success
  end

  test "should update lobby_message" do
    patch lobby_message_url(@lobby_message), params: { lobby_message: { Lobby_id: @lobby_message.Lobby_id, User_id: @lobby_message.User_id, message: @lobby_message.message } }, as: :json
    assert_response 200
  end

  test "should destroy lobby_message" do
    assert_difference('LobbyMessage.count', -1) do
      delete lobby_message_url(@lobby_message), as: :json
    end

    assert_response 204
  end
end
