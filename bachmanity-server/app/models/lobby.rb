class Lobby < ApplicationRecord
  has_many :lobby_messages
  has_many :queued_videos
end
