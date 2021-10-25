import { RECEIVE_PUBLIC_SERVERS } from "../actions/servers_actions";

const publicServersReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PUBLIC_SERVERS:
      return Object.assign([], action.publicServers);
    default:
      return state;
  }
};

export default publicServersReducer;