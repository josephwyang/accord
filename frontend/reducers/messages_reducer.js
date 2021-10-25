import { RECEIVE_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_MESSAGE, REMOVE_MESSAGE } from "../actions/messages_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || action.payload.server.genre === "gc") {
        return Object.assign({}, action.payload.messages)
      } else { return state };
    case RECEIVE_CHANNEL:
      return Object.assign({}, action.payload.messages);
    case RECEIVE_MESSAGE:
      const { server, ...message } = action.message
      return Object.assign({}, state, { [message.id]: message });
    case REMOVE_MESSAGE:
      const {[action.messageId]: removedMessageId, ...newState} = state;
      return newState;
    case REMOVE_SERVER:
      return {};
    default:
      return state;
  }
};

export default messagesReducer;