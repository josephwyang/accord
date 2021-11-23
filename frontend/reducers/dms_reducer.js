import { RECEIVE_DMS } from "../actions/dms_actions";
import { RECEIVE_MESSAGE, RECEIVE_NOTIFICATION } from "../actions/messages_actions";
import { RECEIVE_SERVER, RECEIVE_UPDATED_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const dmsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_DMS:
      return Object.assign({}, action.dms);
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || parseInt(action.payload.server.genre[0])) {
        return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
      } else return state;
    case RECEIVE_UPDATED_SERVER:
      if (action.server.genre === "dm" || parseInt(action.server.genre[0])) {
        return Object.assign({}, state, { [action.server.id]: action.server });
      } else return state;
    case RECEIVE_MESSAGE:
    case RECEIVE_NOTIFICATION:
      if(state[action.message.server.id]) {
        const updatedDm = Object.assign({}, state[action.message.server.id], {lastMessage: action.message.server.lastMessage});
        return Object.assign({}, state, {[updatedDm.id]: updatedDm});
      } else return state;
    case REMOVE_SERVER:
      const {[action.serverId]: removedDmId, ...newState} = state;
      return newState;
    default:
      return state;
  }
};

export default dmsReducer;