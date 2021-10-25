class Api::FriendshipsController < ApplicationController
  def index
    user = User.includes(:initiated_friendships, :initiated_friends, :received_friendships, :received_friends).find_by(id: current_user.id)
    @initiated_friendships = user.initiated_friendships.where(accepted: true)
    @received_friendships = user.received_friendships.where(accepted: true)
    @pending_friends = user.initiated_friendships.where(accepted: false)
    @friend_requests = user.received_friendships.where(accepted: false)
    render :index
  end

  def create
    friend = User.find_by(username:params[:username], tag:params[:tag])
    
    if !friend
      render json: ["unable to find user #{params[:username]}##{params[:tag]}"], status: 400
      return
    end

    @friendship = Friendship.new(user_id: current_user.id, friend_id: friend.id)
    if @friendship.save
      user = User.find_by(id: @friendship.user_id)
      friend = User.find_by(id: @friendship.friend_id)
      FriendshipsChannel.broadcast_to user, Api::FriendshipsController.render(:show, locals: { friendship: @friendship, friend: friend })
      FriendshipsChannel.broadcast_to friend, Api::FriendshipsController.render(:show, locals: { friendship: @friendship, friend: user })
      render :show, locals: { friendship: @friendship, friend: friend }
    else
      render json: @friendship.errors.full_messages, status: 400
    end
  end

  def update
    @friendship = Friendship.find_by(id:params[:id])
    if @friendship.update_attributes(accepted:params[:accepted])
      user = User.find_by(id: @friendship.user_id)
      friend = User.find_by(id: @friendship.friend_id)
      FriendshipsChannel.broadcast_to user, Api::FriendshipsController.render(:show, locals: { friendship: @friendship, friend: friend })
      FriendshipsChannel.broadcast_to friend, Api::FriendshipsController.render(:show, locals: { friendship: @friendship, friend: user })
    else
      render json: @friendship.errors.full_messages, status: 400
    end
  end

  def destroy
    @friendship = Friendship.find_by(id:params[:id])
    @friendship.destroy
    user = User.find_by(id: @friendship.user_id)
    friend = User.find_by(id: @friendship.friend_id)
    FriendshipsChannel.broadcast_to user, { friendshipId: @friendship.id }
    FriendshipsChannel.broadcast_to friend, { friendshipId: @friendship.id }
  end
end