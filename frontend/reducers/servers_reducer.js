import { RECEIVE_SERVERS, RECEIVE_SERVER, RECEIVE_UPDATED_SERVER, REMOVE_SERVER } from "../actions/servers_actions";
import { RECEIVE_MEMBERSHIP, REMOVE_MEMBERSHIP } from "../actions/memberships_actions";

const serversReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SERVERS:
      return Object.assign({}, action.servers);
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || parseInt(action.payload.server.genre[0])) return state;
      return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
    case RECEIVE_UPDATED_SERVER:
      if (action.server.genre === "dm" || parseInt(action.server.genre[0])) return state;
      return Object.assign({}, state, { [action.server.id]: action.server });
    case REMOVE_SERVER:
      const {[action.serverId]: removedServerId, ...newState} = state;
      return newState;
    case RECEIVE_MEMBERSHIP:
      if (action.payload.server.genre === "dm" || parseInt(action.payload.server.genre[0])) return state;
      return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
    case REMOVE_MEMBERSHIP:
      if (action.payload.userId === action.payload.currentUserId) {
        const {[action.payload.serverId]: removedServerId, ...newState} = state;
        return newState;
      } else return state;
    default:
      return state;
  }
};

export default serversReducer;