class LobbyPlaylist < ApplicationRecord
  belongs_to :Lobby
  belongs_to :User
end
