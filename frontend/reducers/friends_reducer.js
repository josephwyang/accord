import { RECEIVE_FRIENDS, RECEIVE_FRIEND, REMOVE_FRIEND } from "../actions/friends_actions";

const friendsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FRIENDS:
      return Object.assign({}, action.payload.friends);
    case RECEIVE_FRIEND:
      return Object.assign({}, state, { [action.friend.friendshipId]: action.friend });
    case REMOVE_FRIEND:
      const { [action.friendshipId]: removedFriend, ...friends } = state;
      return Object.assign({}, friends);
    default:
      return state;
  }
};

export default friendsReducer;