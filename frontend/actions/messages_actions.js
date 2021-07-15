import * as MessagesUtil from "../utils/messages_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const postMessage = message => dispatch => (
  MessagesUtil.postMessage(message)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);