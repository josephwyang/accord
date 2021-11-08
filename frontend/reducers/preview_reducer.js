import { RECEIVE_FRIENDS } from "../actions/friends_actions";
import { PREVIEW_SERVER, RECEIVE_PUBLIC_SERVERS, RECEIVE_SERVER, REMOVE_PREVIEW } from "../actions/servers_actions";

const previewReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case PREVIEW_SERVER:
      return action.payload.server;
    case RECEIVE_SERVER:
    case RECEIVE_PUBLIC_SERVERS:
    case RECEIVE_FRIENDS:
    case REMOVE_PREVIEW:
      return {};
    default:
      return state;
  }
};

export default previewReducer;