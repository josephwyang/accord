import * as SessionUtil from "../utils/session_util";
import * as UsersUtil from "../utils/users_util";
import { receiveErrors } from "./errors_actions";

export const LOG_IN_USER = "LOG_IN_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const RECEIVE_VERIFICATION_CODE = "RECEIVE_VERIFICATION_CODE";
export const REMOVE_CURRENT_CHANNEL = "REMOVE_CURRENT_CHANNEL";

const receiveSession = currentUser => ({
  type: LOG_IN_USER,
  currentUser
});

const deleteSession = () => ({
  type: LOG_OUT_USER,
});

const receiveVerificationCode = code => ({
  type: RECEIVE_VERIFICATION_CODE,
  code
});

const updateUser = currentUser => ({
  type: UPDATE_USER,
  currentUser
});

export const removeCurrentChannel = () => ({
  type: REMOVE_CURRENT_CHANNEL
});

export const logInUser = currentUser => dispatch => (
  SessionUtil.postSession(currentUser)
    .then(currentUser => dispatch(receiveSession(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logOutUser = () => dispatch => (
  SessionUtil.deleteSession()
    .then(()  => dispatch(deleteSession()),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const postUser = user => dispatch => (
  SessionUtil.postUser(user)
    .then(user => dispatch(receiveSession(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const verifyPhoneNumber = phoneNumber => dispatch => (
  UsersUtil.verifyPhoneNumber(phoneNumber)
    .then(code => dispatch(receiveVerificationCode(code)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const patchUser = formData => dispatch => (
  UsersUtil.patchUser(formData)
    .then(user => dispatch(updateUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const deleteUser = formData => dispatch => (
  UsersUtil.deleteUser(formData)
    .then(() => dispatch(deleteSession()),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);