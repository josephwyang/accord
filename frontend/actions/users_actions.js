import * as UsersUtil from "../utils/users_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SEARCH_USER = "SEARCH_USER";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const searchUser = user => ({
  type: SEARCH_USER,
  user
});

export const getUserByTag = accordTag => dispatch => (
  UsersUtil.getUserByTag(accordTag)
    .then(user => dispatch(searchUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getUsers = () => dispatch => (
  UsersUtil.getUsers()
    .then(users => dispatch(receiveUsers(users)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);