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
class Dm < ApplicationRecord
  validates :user_id, presence:true
  validates :friend_id, presence:true

  belongs_to :user
  belongs_to :friend, class_name: :User
  has_one :channel, dependent: :destroy
end