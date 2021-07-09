import { RECEIVE_SERVERS, RECEIVE_SERVER } from "../actions/servers_actions";

const serversReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SERVERS:
      return Object.assign({}, action.servers);
    case RECEIVE_SERVER:
      return Object.assign({}, state, { [action.server.id]: action.server });
    default:
      return state;
  }
};

export default serversReducer;