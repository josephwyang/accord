class Api::ReactionsController < ApplicationController
  def create
    reaction = Reaction.new(reaction_params)
    if reaction.save
      channel = reaction.channel
      MessagesChannel.broadcast_to channel, Api::ReactionsController.render(:show, locals: { reaction: reaction, channel: channel })
    else
      render json: reaction.errors.full_messages, status:400
    end
  end

  def destroy
    reaction = Reaction.find_by(id:params[:id])
    if reaction.reactor_id == current_user.id
      channel = reaction.channel
      reaction.destroy
      MessagesChannel.broadcast_to channel, { reaction_id: reaction.id, message_id: reaction.message_id, channel_id: channel.id }.transform_keys { |key| key.to_s.camelize(:lower) }
    else
      render json: ["cannot delete someone else's reaction"]
    end
  end

  def reaction_params
    params.require(:reaction).transform_keys { |key| key.to_s.underscore }.permit(:emoji, :reactor_id, :message_id)
  end
end