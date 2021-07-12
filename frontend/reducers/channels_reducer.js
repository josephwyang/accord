import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from "../actions/channels_actions"

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS:
      return Object.assign({}, action.channels);
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, { [action.channel.id]: action.channel });
    default:
      return state;
  }
};

export default channelsReducer;