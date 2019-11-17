class CreateQueuedVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :queued_videos do |t|
      t.references :lobby, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :video, null: false 

      t.timestamps
    end
  end
end
