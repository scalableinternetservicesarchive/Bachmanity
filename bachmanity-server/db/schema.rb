# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_04_014731) do

  create_table "lobbies", force: :cascade do |t|
    t.string "title"
    t.string "desc"
    t.string "currentVideoUrl"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "lobby_messages", force: :cascade do |t|
    t.string "message"
    t.integer "Lobby_id", null: false
    t.integer "User_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["Lobby_id"], name: "index_lobby_messages_on_Lobby_id"
    t.index ["User_id"], name: "index_lobby_messages_on_User_id"
  end

  create_table "lobby_playlists", force: :cascade do |t|
    t.string "videoUrl"
    t.integer "Lobby_id", null: false
    t.integer "User_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["Lobby_id"], name: "index_lobby_playlists_on_Lobby_id"
    t.index ["User_id"], name: "index_lobby_playlists_on_User_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "passwordsha256"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "lobby_messages", "Lobbies"
  add_foreign_key "lobby_messages", "Users"
  add_foreign_key "lobby_playlists", "Lobbies"
  add_foreign_key "lobby_playlists", "Users"
end
