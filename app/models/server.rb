# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  owner_id   :integer          not null
#  name       :string(100)      not null
#  genre      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  public     :boolean          not null
#
class Server < ApplicationRecord
  validates :owner_id, presence:true
  validates :name, length: { minimum:2, maximum:100 }
  validates :public, inclusion: { in: [true, false] }
  validates :genre, presence:true, if: :public

  belongs_to :owner, class_name: :User
  has_many :memberships, dependent: :delete_all
  has_many :members, through: :memberships, source: :user
  has_many :channels

  has_one_attached :photo
end
