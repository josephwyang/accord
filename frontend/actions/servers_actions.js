import * as ServersUtil from "../utils/servers_util";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_UPDATED_SERVER = "RECEIVE_UPDATED_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

export const RECEIVE_PUBLIC_SERVERS = "RECEIVE_PUBLIC_SERVERS";
export const PREVIEW_SERVER = "PREVIEW_SERVER";
export const REMOVE_PREVIEW = "REMOVE_PREVIEW";

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

export const receiveServer = payload => ({
  type: RECEIVE_SERVER,
  payload
});

export const receiveUpdatedServer = server => ({
  type: RECEIVE_UPDATED_SERVER,
  server
});

export const removeServer = serverId => ({
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

export const removePreview = () => ({
  type: REMOVE_PREVIEW
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
    .then(payload => payload,
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const patchServer = server => dispatch => (
  ServersUtil.patchServer(server)
    .then(null,
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const deleteServer = serverId => dispatch => (
  ServersUtil.deleteServer(serverId)
    .then(null,
      errors => dispatch(receiveErrors(errors.responseJSON)))
);