import { LOG_IN_USER, LOG_OUT_USER } from "../actions/session_actions"

const _nullState = { currentUserId:null }

const sessionReducer = (state=_nullState, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case LOG_IN_USER:
      return { currentUserId: action.currentUser.id };
    case LOG_OUT_USER:
      return _nullState;
    default:
      return state;
  }
};

export default sessionReducer;