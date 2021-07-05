# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string(32)       not null
#  email           :string           not null
#  password_digest :string           not null
#  date_of_birth   :date
#  tag             :string(4)        not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone_number    :string(15)
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
