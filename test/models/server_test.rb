# == Schema Information
#
# Table name: servers
#
#  id           :bigint           not null, primary key
#  owner_id     :integer          not null
#  name         :string(100)      not null
#  genre        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  public       :boolean          not null
#  description  :string(255)
#  last_message :datetime
#
require 'test_helper'

class ServerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
