# == Schema Information
#
# Table name: reactions
#
#  id         :bigint           not null, primary key
#  reactor_id :integer          not null
#  message_id :integer          not null
#  emoji      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reaction < ApplicationRecord
  belongs_to :reactor, class_name: :User
  belongs_to :message
  has_one :channel, through: :message
end