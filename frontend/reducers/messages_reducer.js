import { RECEIVE_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_MESSAGE, REMOVE_MESSAGE } from "../actions/messages_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";
import { RECEIVE_REACTION, REMOVE_REACTION } from "../actions/reactions_actions";

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
      const { [action.messageId]: removedMessageId, ...newState } = state;
      return newState;
    case RECEIVE_REACTION:
      const reactions = Object.assign({}, state[action.reaction.messageId].reactions, { [action.reaction.id]: action.reaction });
      const updatedMessage = Object.assign({}, state[action.reaction.messageId], { reactions });
      return Object.assign({}, state, { [updatedMessage.id]: updatedMessage });
    case REMOVE_REACTION:
      const { [action.reaction.reactionId]: removedReaction, ...remainingReactions } = state[action.reaction.messageId].reactions;
      const removedReactionMessage = Object.assign({}, state[action.reaction.messageId], {reactions: remainingReactions});
      return Object.assign({}, state, { [removedReactionMessage.id]: removedReactionMessage });
    case REMOVE_SERVER:
      return {};
    default:
      return state;
  }
};

export default messagesReducer;