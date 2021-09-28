import { LOG_IN_USER, LOG_OUT_USER } from "../actions/session_actions"

const _nullState = { currentUser: null }

const sessionReducer = (state=_nullState, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case LOG_IN_USER:
      return { currentUser: action.currentUser };
    case LOG_OUT_USER:
      return _nullState;
    default:
      return state;
  }
};

export default sessionReducer;