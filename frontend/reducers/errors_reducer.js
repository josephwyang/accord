import { RECEIVE_ERRORS } from "../actions/errors_actions";

const errorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors || [];
    default:
      return [];
  }
};

export default errorsReducer;