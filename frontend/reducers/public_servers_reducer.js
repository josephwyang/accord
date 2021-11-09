import { RECEIVE_PUBLIC_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const publicServersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PUBLIC_SERVERS:
      return Object.assign({}, action.publicServers);
    case RECEIVE_SERVER:
      if (action.payload.server.public) return Object.assign({}, state, { [action.payload.server.id]: action.payload.server });
      return state;
    case REMOVE_SERVER:
      const {[action.serverId]: removedServerId, ...newState} = state;
      return newState;
    default:
      return state;
  }
};

export default publicServersReducer;