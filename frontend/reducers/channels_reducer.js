import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, RECEIVE_UPDATED_CHANNEL, REMOVE_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_SERVER, PREVIEW_SERVER, REMOVE_SERVER } from "../actions/servers_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, action.channels);
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { [action.payload.channel.id]: action.payload.channel });
    case RECEIVE_UPDATED_CHANNEL:
      return Object.assign({}, state, { [action.channel.id]: action.channel });
    case REMOVE_CHANNEL:
      const { [action.channelId]: removedChannelId, ...channels } = state;
      return Object.assign({}, channels);
    case RECEIVE_SERVER:
    case PREVIEW_SERVER:
      return Object.assign({}, action.payload.channels);
    case REMOVE_SERVER:
      return {};
    default:
      return state;
  }
};

export default channelsReducer;