class CreateLobbyMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :lobby_messages do |t|
      t.string :message, null: false
      t.references :lobby, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
