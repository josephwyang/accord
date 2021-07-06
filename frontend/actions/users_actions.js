import * as UsersUtil from "../utils/users_util"

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
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