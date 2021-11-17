# == Schema Information
#
# Table name: messages
#
#  id                 :bigint           not null, primary key
#  sender_id          :integer          not null
#  replied_message_id :integer
#  body               :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  channel_id         :integer          not null
#  edited             :boolean          default(FALSE), not null
#  invitation         :integer
#
require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
