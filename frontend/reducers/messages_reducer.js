import { RECEIVE_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from "../actions/messages_actions"

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return Object.assign({}, action.messages);
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message.id]: action.message });
    case RECEIVE_CHANNEL:
      return Object.assign({}, action.payload.messages);
    default:
      return state;
  }
};

export default messagesReducer;