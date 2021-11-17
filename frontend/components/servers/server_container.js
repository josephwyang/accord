import { connect } from "react-redux";
import { getServer, getServers, patchServer, previewServer } from "../../actions/servers_actions";
import Server from "./server";
import { firstChannelId } from "../../reducers/channels_selector";
import { withRouter } from "react-router";
import { postMembership, deleteMembership } from "../../actions/memberships_actions";
import { postMessage } from "../../actions/messages_actions";

const mSTP = (state, ownProps) => ({
  servers: state.entities.servers,
  publicServers: state.entities.publicServers,
  server: state.entities.servers[ownProps.match.params.serverId] || state.entities.preview,
  channels: Object.values(state.entities.channels),
  currentChannel: state.entities.channels[ownProps.match.params.channelId],
  currentUser: state.session.currentUser,
  firstChannelId
});

const mDTP = (dispatch, ownProps) => ({
  getServers: () => dispatch(getServers()),
  getServer: () => dispatch(getServer(ownProps.match.params.serverId)),
  previewServer: () => dispatch(previewServer(ownProps.match.params.serverId)),
  patchServer: data => dispatch(patchServer(data)),
  postMessage: message => dispatch(postMessage(message)),
  postMembership: membership => dispatch(postMembership(membership)),
  deleteMembership: data => dispatch(deleteMembership(data))
});

const ServerContainer = withRouter(connect(mSTP, mDTP)(Server));
export default ServerContainer;