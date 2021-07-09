import * as UsersUtil from "../utils/users_util"
import { receiveErrors } from "./errors_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const getUsers = () => dispatch => (
  UsersUtil.getUsers()
    .then(users => dispatch(receiveUsers(users)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);