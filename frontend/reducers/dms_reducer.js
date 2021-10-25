import { RECEIVE_DMS } from "../actions/dms_actions";
import { RECEIVE_MESSAGE, RECEIVE_NOTIFICATION } from "../actions/messages_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const dmsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_DMS:
      return Object.assign({}, action.dms);
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || action.payload.server.genre === "gc") {
        return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
      } else {
        return state;
      }
    case RECEIVE_MESSAGE:
    case RECEIVE_NOTIFICATION:
      const updatedDm = Object.assign({}, state[action.message.server.id], {lastMessage: action.message.server.lastMessage});
      return Object.assign({}, state, {[updatedDm.id]: updatedDm})
    case REMOVE_SERVER:
      const {[action.serverId]: removedDmId, ...newState} = state;
      return newState;
    default:
      return state;
  }
};

export default dmsReducer;