class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render :show
    else
      render json: @membership.errors.full_messages, status:400
    end
  end

  def destroy
    @membership = Membership.find_by(membership_params)
    @membership.destroy
    render :show
  end

  def membership_params
    params.transform_keys { |key| key.to_s.underscore }.permit(:server_id, :user_id, :description)
  end
end