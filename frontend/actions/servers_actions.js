import * as ServersUtil from "../utils/servers_util";
import { receiveUsers } from "./users_actions";
import { receiveChannels } from "./channels_actions";
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

const receiveServer = payload => ({
  type: RECEIVE_SERVER,
  payload
});

const removeServer = server => ({
  type: REMOVE_SERVER,
  server
});

export const getServers = () => dispatch => (
  ServersUtil.getServers()
    .then(servers => dispatch(receiveServers(servers)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getServer = serverId => dispatch => (
  ServersUtil.getServer(serverId)
    .then(payload => dispatch(receiveServer(payload))
      , errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getPublicServers = () => dispatch => (
  ServersUtil.getPublicServers()
    .then(servers => dispatch(receiveServers(servers)),
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
    .then(server => dispatch(removeServer(server)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);