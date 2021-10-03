import { LOG_IN_USER, LOG_OUT_USER, RECEIVE_VERIFICATION_CODE } from "../actions/session_actions"

const _nullState = { currentUser: null }

const sessionReducer = (state=_nullState, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case LOG_IN_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case LOG_OUT_USER:
      return _nullState;
    case RECEIVE_VERIFICATION_CODE:
      return Object.assign({}, state, action.code);
    default:
      return state;
  }
};

export default sessionReducer;