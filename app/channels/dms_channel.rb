class DmsChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find_by(id: dm_params[:current_user_id])
    stream_for @user
  end

  def dm_params
    params.transform_keys { |key| key.to_s.underscore }
  end
end