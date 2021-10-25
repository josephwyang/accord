import { RECEIVE_FRIEND, RECEIVE_FRIEND_REQUEST, RECEIVE_FRIENDS, REMOVE_FRIEND } from "../actions/friends_actions";

const friendRequestsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FRIENDS:
      return Object.assign({}, action.payload.friendRequests);
    case RECEIVE_FRIEND:
      const {[action.friend.friendshipId]: addedFriend, ...newState} = state;
      return newState;
    case RECEIVE_FRIEND_REQUEST:
      return Object.assign({}, state, { [action.friend.friendshipId]: action.friend });
    case REMOVE_FRIEND:
      const { [action.friendshipId]: removedFriend, ...friends } = state;
      return Object.assign({}, friends);
    default:
      return state;
  }
};

export default friendRequestsReducer;