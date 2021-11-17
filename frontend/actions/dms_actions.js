import * as DmsUtil from "../utils/dms_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_DMS = "RECEIVE_DMS";
export const RECEIVE_DM = "RECEIVE_DM";
export const REMOVE_DM = "REMOVE_DM";

const receiveDms = dms => ({
  type: RECEIVE_DMS,
  dms
});

export const getDms = () => dispatch => (
  DmsUtil.getDms()
    .then(dms => dispatch(receiveDms(dms)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);