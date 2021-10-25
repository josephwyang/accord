import * as ServersUtil from "../utils/servers_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

export const RECEIVE_PUBLIC_SERVERS = "RECEIVE_PUBLIC_SERVERS";
export const PREVIEW_SERVER = "PREVIEW_SERVER";

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

const receiveServer = payload => ({
  type: RECEIVE_SERVER,
  payload
});

const removeServer = serverId => ({
  type: REMOVE_SERVER,
  serverId
});

const receivePublicServers = publicServers => ({
  type: RECEIVE_PUBLIC_SERVERS,
  publicServers
});

const receivePreview = payload => ({
  type: PREVIEW_SERVER,
  payload
});

export const getServers = () => dispatch => (
  ServersUtil.getServers()
    .then(servers => dispatch(receiveServers(servers)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getServer = serverId => dispatch => (
  ServersUtil.getServer(serverId)
    .then(payload => dispatch(receiveServer(payload)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getPublicServers = () => dispatch => (
  ServersUtil.getPublicServers()
    .then(publicServers => dispatch(receivePublicServers(publicServers)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const previewServer = serverId => dispatch => (
  ServersUtil.getServer(serverId)
    .then(preview => dispatch(receivePreview(preview)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const postServer = server => dispatch => (
  ServersUtil.postServer(server)
    .then(server => dispatch(receiveServer(server)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const patchServer = server => dispatch => (
  ServersUtil.patchServer(server)
    .then(server => dispatch(receiveServer(server)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const deleteServer = serverId => dispatch => (
  ServersUtil.deleteServer(serverId)
    .then(serverId => dispatch(removeServer(serverId)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);