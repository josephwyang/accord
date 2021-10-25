# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  accepted   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord
  validates :user_id, uniqueness: { scope: :friend_id }
  validates :accepted, inclusion: { in: [true, false] }
  validate :cannot_add_self

  belongs_to :user
  belongs_to :friend, class_name: :User

  private
  def cannot_add_self
    errors.add(:user_id, 'you cannot add yourself as a friend.') if user_id == friend_id
  end
end