import { RECEIVE_FRIEND, RECEIVE_FRIENDS, RECEIVE_PENDING_FRIEND, REMOVE_FRIEND } from "../actions/friends_actions";

const pendingFriendsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FRIENDS:
      return Object.assign({}, action.payload.pendingFriends);
    case RECEIVE_PENDING_FRIEND:
      return Object.assign({}, state, { [action.friend.friendshipId]: action.friend });
    case RECEIVE_FRIEND:
      const { [action.friend.friendshipId]: addedFriend, ...stillPending } = state;
      return stillPending;
    case REMOVE_FRIEND:
      const { [action.friendshipId]: removedFriend, ...friends } = state;
      return friends;
    default:
      return state;
  }
};

export default pendingFriendsReducer;