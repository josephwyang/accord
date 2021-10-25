import * as MembershipsUtil from "../utils/memberships_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";

export const receiveMembership = membership => ({
  type: RECEIVE_MEMBERSHIP,
  membership
});

export const removeMembership = membershipId => ({
  type: REMOVE_MEMBERSHIP,
  membershipId
});

export const postMembership = membership => dispatch => (
  MembershipsUtil.postMembership(membership)
    .then(membership => dispatch(receiveMembership(membership)),
      errors => dispatch(receiveErrors(errors)))
);

export const deleteMembership = membershipId => dispatch => (
  MembershipsUtil.deleteMembership(membershipId)
    .then (membership => dispatch(removeMembership(membership)),
      errors => dispatch(receiveErrors(errors)))
);