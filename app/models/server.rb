# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  owner_id   :integer          not null
#  name       :string(100)      not null
#  public     :boolean          not null
#  genre      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  private    :boolean          not null
#
class Server < ApplicationRecord
end
