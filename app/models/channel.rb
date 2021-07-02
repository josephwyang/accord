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
end
