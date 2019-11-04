class CreateLobbyMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :lobby_messages do |t|
      t.string :message
      t.references :Lobby, null: false, foreign_key: true
      t.references :User, null: false, foreign_key: true

      t.timestamps
    end
  end
end
