import * as DmsUtil from "../utils/dms_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_DMS = "RECEIVE_DMS";
export const RECEIVE_DM = "RECEIVE_DM";
export const REMOVE_DM = "REMOVE_DM";

const receiveDms = dms => ({
  type: RECEIVE_DMS,
  dms
});

const receiveDm = payload => ({
  type: RECEIVE_DM,
  payload
});

const removeDm = dmId => ({
  type: REMOVE_DM,
  dmId
});

export const getDms = () => dispatch => (
  DmsUtil.getDms()
    .then(dms => dispatch(receiveDms(dms)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

// export const getServer = serverId => dispatch => (
//   ServersUtil.getServer(serverId)
//     .then(payload => dispatch(receiveServer(payload)),
//       errors => dispatch(receiveErrors(errors.responseJSON)))
// );

// export const postServer = server => dispatch => (
//   ServersUtil.postServer(server)
//     .then(server => dispatch(receiveServer(server)),
//       errors => dispatch(receiveErrors(errors.responseJSON)))
// );

// export const patchServer = server => dispatch => (
//   ServersUtil.patchServer(server)
//     .then(server => dispatch(receiveServer(server)),
//       errors => dispatch(receiveErrors(errors.responseJSON)))
// );

// export const deleteServer = serverId => dispatch => (
//   ServersUtil.deleteServer(serverId)
//     .then(serverId => dispatch(removeServer(serverId)),
//       errors => dispatch(receiveErrors(errors.responseJSON)))
// );