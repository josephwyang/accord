import { RECEIVE_USERS } from "../actions/users_actions";
import { RECEIVE_SERVER } from "../actions/servers_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_SERVER:
      return Object.assign({}, action.payload.members);
    default:
      return state;
  }
}

export default usersReducer;