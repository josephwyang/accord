import * as MembershipsUtil from "../utils/memberships_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";

export const receiveMembership = payload => ({
  type: RECEIVE_MEMBERSHIP,
  payload
});

export const removeMembership = payload => ({
  type: REMOVE_MEMBERSHIP,
  payload
});

export const postMembership = membership => dispatch => (
  MembershipsUtil.postMembership(membership)
    .then(payload => dispatch(receiveMembership(payload)),
      errors => dispatch(receiveErrors(errors)))
);

export const deleteMembership = membershipId => (dispatch, getState) => (
  MembershipsUtil.deleteMembership(membershipId)
    .then (payload => {
      const state = getState();
      return dispatch(removeMembership(Object.assign({}, payload, { currentUserId: state.session.currentUser.id })))
    }, errors => dispatch(receiveErrors(errors)))
);