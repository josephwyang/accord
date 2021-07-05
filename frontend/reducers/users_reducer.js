import { RECEIVE_USERS, RECEIVE_USER } from "../actions/users_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

export default usersReducer;