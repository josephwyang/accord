# == Schema Information
#
# Table name: dms
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class DmTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
