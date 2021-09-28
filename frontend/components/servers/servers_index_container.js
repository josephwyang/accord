import { connect } from "react-redux";
import ServersIndex from "./servers_index";
import { getServers, getServer, previewServer } from "../../actions/servers_actions"

const mSTP = state => ({
  servers: Object.values(state.entities.servers),
  preview: state.entities.preview
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers()),
  getServer: serverId => dispatch(getServer(serverId)),
  previewServer: serverId => dispatch(previewServer(serverId))
});

const ServersIndexContainer = connect(mSTP, mDTP)(ServersIndex);
export default ServersIndexContainer;