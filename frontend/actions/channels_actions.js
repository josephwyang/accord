import * as ChannelsUtil from "../utils/channels_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_UPDATED_CHANNEL = "RECEIVE_UPDATED_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

const receiveChannel = payload => ({
  type: RECEIVE_CHANNEL,
  payload
});

const receiveUpdatedChannel = channel => ({
  type: RECEIVE_UPDATED_CHANNEL,
  channel
});

const removeChannel = channelId => ({
  type: REMOVE_CHANNEL,
  channelId
});

export const getChannel = channelId  => dispatch => (
  ChannelsUtil.getChannel(channelId)
    .then(payload => dispatch(receiveChannel(payload)),
      errors => dispatch(receiveErrors(errors)))
);

export const postChannel = channel => dispatch => (
  ChannelsUtil.postChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)),
      errors => dispatch(receiveErrors(errors)))
);

export const patchChannel = channel => dispatch => (
  ChannelsUtil.patchChannel(channel)
    .then(channel => dispatch(receiveUpdatedChannel(channel)),
      errors => dispatch(receiveErrors(errors)))
);

export const deleteChannel = channelId => dispatch => (
  ChannelsUtil.deleteChannel(channelId)
    .then(channelId => dispatch(removeChannel(channelId)),
      errors => dispatch(receiveErrors(errors)))
);