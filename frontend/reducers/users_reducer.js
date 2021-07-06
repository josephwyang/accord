import { LOG_IN_USER } from "../actions/session_actions";
import { RECEIVE_USERS } from "../actions/users_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case LOG_IN_USER:
      return Object.assign({}, state, {[action.currentUser.id]: action.currentUser});
    default:
      return state;
  }
}

export default usersReducer;