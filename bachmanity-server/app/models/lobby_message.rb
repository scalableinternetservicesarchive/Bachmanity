class LobbyMessage < ApplicationRecord
  belongs_to :Lobby
  belongs_to :User
end
