# == Schema Information
#
# Table name: messages
#
#  id                 :bigint           not null, primary key
#  sender_id          :integer          not null
#  replied_message_id :integer
#  chat_id            :integer          not null
#  chat_type          :string           not null
#  body               :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Message < ApplicationRecord
end
