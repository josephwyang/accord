import * as FriendsUtil from "../utils/friends_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_PENDING_FRIEND = "RECEIVE_PENDING_FRIEND";
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const REMOVE_FRIEND = "REMOVE_FRIEND";

export const receiveFriends = payload => ({
  type: RECEIVE_FRIENDS,
  payload
});

export const receiveFriend = friend => ({
  type: RECEIVE_FRIEND,
  friend
});

export const receivePendingFriend = friend => ({
  type: RECEIVE_PENDING_FRIEND,
  friend
});

export const receiveFriendRequest = friend => ({
  type: RECEIVE_FRIEND_REQUEST,
  friend
});

export const removeFriend = friendshipId => ({
  type: REMOVE_FRIEND,
  friendshipId
});

export const getFriends = ()  => dispatch => (
  FriendsUtil.getFriends()
    .then(payload => dispatch(receiveFriends(payload)),
      errors => dispatch(receiveErrors(errors)))
);

export const requestFriendship = data  => dispatch => (
  FriendsUtil.requestFriendship(data)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);

export const acceptFriendship = friendshipId => dispatch => (
  FriendsUtil.acceptFriendship(friendshipId)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);

export const deleteFriend = friendshipId => dispatch => (
  FriendsUtil.deleteFriend(friendshipId)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);