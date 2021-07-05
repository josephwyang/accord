import * as UsersUtil from "../utils/users_utils"

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const getUsers = () => dispatch => (
  UsersUtil.getUsers()
    .then(users => dispatch(receiveUsers(users)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getUser = userId => dispatch => (
  UsersUtil.getUser(userId)
    .then(user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const postUser = user => dispatch => (
  UsersUtil.postUser(user)
    .then(user => dispatch(receiveUser(user)),
      errors => {
        debugger
        return dispatch(receiveErrors(errors.responseJSON))})
);