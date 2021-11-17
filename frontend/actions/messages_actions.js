import * as MessagesUtil from "../utils/messages_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveNotification = message => ({
  type: RECEIVE_NOTIFICATION,
  message
});

export const removeMessage = messageId => ({
  type: REMOVE_MESSAGE,
  messageId
});

export const removeNotification = () => ({
  type: REMOVE_NOTIFICATION
});

export const postMessage = message => dispatch => (
  MessagesUtil.postMessage(message)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);

export const patchMessage = message => dispatch => (
  MessagesUtil.patchMessage(message)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);

export const deleteMessage = messageId => dispatch => (
  MessagesUtil.deleteMessage(messageId)
    .then (null,
      errors => dispatch(receiveErrors(errors)))
);