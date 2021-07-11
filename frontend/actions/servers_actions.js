import * as ServersUtil from "../utils/servers_util"
import { receiveErrors } from "./errors_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";

const receiveServers = servers => ({
  type: RECEIVE_SERVERS,
  servers
});

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

export const getServers = () => dispatch => (
  ServersUtil.getServers()
    .then(servers => dispatch(receiveServers(servers)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const postServer = server => dispatch => (
  ServersUtil.postServer(server)
    .then(server => dispatch(receiveServer(server)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const getPublicServers = () => dispatch => (
  ServersUtil.getPublicServers()
    .then(servers => dispatch(receiveServers(servers)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);