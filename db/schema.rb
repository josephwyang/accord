# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_11_025121) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "channels", force: :cascade do |t|
    t.integer "server_id", null: false
    t.string "name", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "dms", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_dms_on_friend_id"
    t.index ["user_id", "friend_id"], name: "index_dms_on_user_id_and_friend_id", unique: true
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "accepted", default: false, null: false
    t.index "GREATEST(user_id, friend_id), LEAST(user_id, friend_id)", name: "index_friendships_on_interchangable_user_id_and_friend_id", unique: true
    t.index "LEAST(user_id, friend_id), GREATEST(user_id, friend_id)", name: "index_friendships_on_interchangable_friend_id_and_user_id", unique: true
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description", null: false
    t.index ["server_id"], name: "index_memberships_on_server_id"
    t.index ["user_id", "server_id"], name: "index_memberships_on_user_id_and_server_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.integer "sender_id", null: false
    t.integer "replied_message_id"
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "channel_id", null: false
    t.boolean "edited", default: false, null: false
    t.integer "invitation"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["replied_message_id"], name: "index_messages_on_replied_message_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.integer "reactor_id", null: false
    t.integer "message_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "emoji", null: false
    t.index ["message_id", "reactor_id", "emoji"], name: "index_reactions_on_message_id_and_reactor_id_and_emoji", unique: true
    t.index ["message_id"], name: "index_reactions_on_message_id"
    t.index ["reactor_id"], name: "index_reactions_on_reactor_id"
  end

  create_table "servers", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "name", limit: 100, null: false
    t.string "genre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "public", null: false
    t.string "description", limit: 255
    t.datetime "last_message", default: -> { "CURRENT_TIMESTAMP" }
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", limit: 32, null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.date "date_of_birth", null: false
    t.string "tag", limit: 4, null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_number", limit: 12, default: ""
    t.string "last_path_visited", default: "/explore"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true, where: "((phone_number)::text <> ''::text)"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username", "tag"], name: "index_users_on_username_and_tag", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
