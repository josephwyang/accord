import { RECEIVE_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_SERVER } from "../actions/servers_actions";
import { LOG_IN_USER, LOG_OUT_USER, RECEIVE_VERIFICATION_CODE, REMOVE_CURRENT_CHANNEL, UPDATE_USER } from "../actions/session_actions"

const _nullState = { currentUser: null, currentChannel: null }

const sessionReducer = (state=_nullState, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case LOG_IN_USER:
    case UPDATE_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case LOG_OUT_USER:
      return _nullState;
    case RECEIVE_VERIFICATION_CODE:
      return Object.assign({}, state, action.code);
    case RECEIVE_SERVER:
      if (action.payload.server.genre === "dm" || parseInt(action.payload.server.genre[0])) {
        return Object.assign({}, state, { currentChannel: action.payload.server.channelId})
      } else { return state };
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { currentChannel: action.payload.channel.id });
    case REMOVE_CURRENT_CHANNEL:
      return Object.assign({}, state, { currentChannel: null });
    default:
      return state;
  }
};

export default sessionReducer;