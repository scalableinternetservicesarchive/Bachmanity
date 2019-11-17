class CreateLobbies < ActiveRecord::Migration[6.0]
  def change
    create_table :lobbies do |t|
      t.string :title, null: false
      t.string :desc, null: false
      # t.string :currentVideoId, null: false

      t.timestamps
    end
  end
end
