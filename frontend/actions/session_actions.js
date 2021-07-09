import * as SessionUtil from "../utils/session_util"
import { receiveErrors } from "./errors_actions";

export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";

const receiveSession = currentUser => ({
  type: LOG_IN_USER,
  currentUser
});

const deleteSession = () => ({
  type: LOG_OUT_USER,
});

export const logInUser = currentUser => dispatch => (
  SessionUtil.postSession(currentUser)
    .then(currentUser => dispatch(receiveSession(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logOutUser = () => dispatch => (
  SessionUtil.deleteSession()
    .then(()  => dispatch(deleteSession()),
      errors =>  dispatch(receiveErrors(errors.responseJSON)))
);

export const postUser = user => dispatch => (
  SessionUtil.postUser(user)
    .then(user => dispatch(receiveSession(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);