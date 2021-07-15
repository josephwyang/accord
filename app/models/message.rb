# == Schema Information
#
# Table name: messages
#
#  id                 :bigint           not null, primary key
#  sender_id          :integer          not null
#  channel_id         :integer          not null
#  replied_message_id :integer
#  body               :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Message < ApplicationRecord
  validates :sender_id, :channel_id, :body, presence:true

  belongs_to :sender, class_name: :User
  belongs_to :channel
  belongs_to :replied_message, class_name: :Message, optional: true
  has_many :replies, foreign_key: :replied_message_id, class_name: :Message
end