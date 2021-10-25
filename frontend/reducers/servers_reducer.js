import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const serversReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SERVERS:
      return Object.assign({}, action.servers);
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || action.payload.server.genre === "gc") {
        return state;
      } else {
        return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
      }
    case REMOVE_SERVER:
      const {[action.serverId]: removedServerId, ...newState} = state;
      return newState;
    default:
      return state;
  }
};

export default serversReducer;