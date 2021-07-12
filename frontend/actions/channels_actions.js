import * as ChannelsUtil from "../utils/channels_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const postChannel = channel => dispatch => (
  ChannelsUtil.postChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)),
      errors => dispatch(receiveErrors(errors)))
);