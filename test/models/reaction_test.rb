# == Schema Information
#
# Table name: reactions
#
#  id         :bigint           not null, primary key
#  reactor_id :integer          not null
#  message_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  emoji      :string           not null
#
require 'test_helper'

class ReactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
