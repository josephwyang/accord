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
  validates :description, inclusion: { in: ["server", "dm", "gc"] }

  belongs_to :user
  belongs_to :server

  has_many :server_members,
    through: :server,
    source: :members

  has_one :channel,
    through: :server,
    source: :channels
  
  has_many :messages,
    through: :server,
    source: :messages
    
  scope :server_memberships, ->(id) { where(description: "server", user_id:id) }
  scope :dm_memberships, ->(id) { where(description: "dm", user_id:id) }
  scope :gc_memberships, ->(id) { where(description: "gc", user_id:id) }
end