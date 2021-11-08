import * as ReactionsUtil from "../utils/reactions_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_REACTION = "RECEIVE_REACTION";
export const REMOVE_REACTION = "REMOVE_REACTION";

export const receiveReaction = reaction => ({
  type: RECEIVE_REACTION,
  reaction
});

export const removeReaction = reaction => ({
  type: REMOVE_REACTION,
  reaction
});

export const postReaction = reaction => dispatch => (
  ReactionsUtil.postReaction(reaction)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);

export const deleteReaction = reactionId  => dispatch => (
  ReactionsUtil.deleteReaction(reactionId)
    .then(null,
      errors => dispatch(receiveErrors(errors)))
);