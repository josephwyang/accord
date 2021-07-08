# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  owner_id   :integer          not null
#  name       :string(100)      not null
#  public     :boolean          default(FALSE)
#  genre      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
  validates :owner_id, presence:true
  validates :name, length: { minimum:2, maximum:100 }
  validates :public, inclusion: { in: [true, false] }
  validates :genre, presence:true, if: :public

  belongs_to :owner, class_name: :User
  has_many :memberships, dependent: :delete_all
  has_many :members, through: :memberships, source: :user
end