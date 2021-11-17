import { RECEIVE_USERS } from "../actions/users_actions";
import { UPDATE_USER } from "../actions/session_actions";
import { PREVIEW_SERVER, RECEIVE_SERVER } from "../actions/servers_actions";
import { RECEIVE_MEMBERSHIP, REMOVE_MEMBERSHIP } from "../actions/memberships_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case UPDATE_USER:
      if (state[action.currentUser.id]) return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
      return state;
    case RECEIVE_MEMBERSHIP:
      return Object.assign({}, state, { [action.payload.member.id]: action.payload.member });
    case RECEIVE_SERVER:
    case PREVIEW_SERVER:
      return Object.assign({}, action.payload.members);
    case REMOVE_MEMBERSHIP:
      if (action.payload.userId !== action.payload.currentUserId) {
        const {[action.payload.userId]: removedUser, ...newState} = state;
        return newState;
      } else return state;
    default:
      return state;
  }
}

export default usersReducer;