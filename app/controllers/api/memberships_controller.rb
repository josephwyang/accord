class Api::MembershipsController < ApplicationController
  def create
    membership = Membership.new(membership_params)
    if membership.save
      @member = membership.user
      render :show
    else
      render json: membership.errors.full_messages, status:400
    end
  end

  def destroy
    membership = Membership.find_by(membership_params)
    if ((membership.user_id == current_user.id) != (membership.server.owner_id == current_user.id))
      membership.destroy
      render json: { server_id: membership.server_id, user_id: membership.user_id }.transform_keys { |key| key.to_s.camelize(:lower) }
    else
      render json: ["only server owners can remove members apart from themselves"], status: 401
    end
  end

  def membership_params
    params.transform_keys { |key| key.to_s.underscore }.permit(:server_id, :user_id, :description)
  end
end