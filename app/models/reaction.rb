# == Schema Information
#
# Table name: reactions
#
#  id         :bigint           not null, primary key
#  reactor_id :integer          not null
#  message_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reaction < ApplicationRecord
end
