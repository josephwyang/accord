# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  username          :string(32)       not null
#  email             :string           not null
#  password_digest   :string           not null
#  date_of_birth     :date             not null
#  tag               :string(4)        not null
#  session_token     :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  phone_number      :string(12)       default("")
#  last_path_visited :string           default("/explore")
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
