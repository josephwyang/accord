import { LOG_IN_USER } from "../actions/session_actions";
import { RECEIVE_ERRORS } from "../actions/errors_actions";

const errorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors || [];
    case LOG_IN_USER:
      return [];
    default:
      return state;
  }
};

export default errorsReducer;