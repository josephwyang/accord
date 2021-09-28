# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  server_id  :integer          not null
#  name       :string(100)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
  validates :server_id, presence:true
  validates :name, presence:true, length: { maximum:100 }

  belongs_to :server
  has_many :messages, dependent: :destroy
end