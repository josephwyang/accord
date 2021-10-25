class FriendshipsChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find_by(id: friendship_params[:user_id])
    @friend = User.find_by(id: friendship_params[:friend_id])
    stream_for @user
    stream_for @friend
  end

  def friendship_params
    params.transform_keys { |key| key.to_s.underscore }
  end
end