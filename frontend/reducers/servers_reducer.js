import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const serversReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SERVERS:
      return Object.assign({}, action.servers);
    case RECEIVE_SERVER:
      return Object.assign({}, state, { [action.server.id]: action.server });
    case REMOVE_SERVER:
      const {[action.server.id]: removedServerId, ...newState} = state;
      return newState;
    default:
      return state;
  }
};

export default serversReducer;