class MembersChannel < ApplicationCable::Channel
  # def subscribed
  #   @server = Server.find_by(id: member_params[:server_id])
  #   stream_for @server
  # end
  
  # def appear
  #   debugger
  #   MembersChannel.broadcast_to @server, user_id: current_user.id, status: "online"
  # end

  # def unsubscribed
  #   debugger
  #   MembersChannel.broadcast_to @server, user_id: current_user.id, status: "offline"
  # end

  # def member_params
  #   params.transform_keys { |key| key.to_s.underscore }
  # end
end