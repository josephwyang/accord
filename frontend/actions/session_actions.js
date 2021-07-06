import * as SessionUtil from "../utils/session_util"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";

const receiveSession = currentUser => ({
  type: LOG_IN_USER,
  currentUser
});

const deleteSession = () => ({
  type: LOG_OUT_USER,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const logInUser = currentUser => dispatch => (
  SessionUtil.postSession(currentUser)
    .then(currentUser => dispatch(receiveSession(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logOutUser = () => dispatch => (
  SessionUtil.deleteSession()
    .then(()  => dispatch(deleteSession()),
      errors => { debugger
        return dispatch(receiveErrors(errors.responseJSON))})
);

export const postUser = user => dispatch => (
  SessionUtil.postUser(user)
    .then(user => dispatch(receiveSession(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);