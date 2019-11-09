class AddIndexLobbyMessages < ActiveRecord::Migration[6.0]
  def change
    add_index :lobby_messages, [:lobby_id, :id]
  end
end