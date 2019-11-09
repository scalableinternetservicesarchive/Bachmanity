class CreateLobbies < ActiveRecord::Migration[6.0]
  def change
    create_table :lobbies do |t|
      t.string :title
      t.string :desc
      t.string :currentVideoId

      t.timestamps
    end
  end
end
