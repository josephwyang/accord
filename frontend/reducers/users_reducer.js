import { RECEIVE_USERS } from "../actions/users_actions";
import { PREVIEW_SERVER, RECEIVE_SERVER } from "../actions/servers_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_SERVER:
    case PREVIEW_SERVER:
      return Object.assign({}, action.payload.members);
    default:
      return state;
  }
}

export default usersReducer;