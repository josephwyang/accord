# == Schema Information
#
# Table name: memberships
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  server_id   :integer          not null
#  description :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Membership < ApplicationRecord
  validates :user_id, presence:true, uniqueness: { scope: :server_id }
  validates :server_id, presence:true
  validates :description, inclusion: { in: ["server", "dm"] }

  belongs_to :user
  belongs_to :server

  scope :server_memberships, ->(id) { where(description: "server", user_id:id) }
  scope :dm_memberships, ->(id) { where(description: "dm", user_id:id) }
end