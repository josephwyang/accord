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
#  country_code    :string
#  phone_number    :string(10)
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
