import { connect } from "react-redux";
import ServersIndex from "./servers_index";
import { getServers, getServer } from "../../actions/servers_actions"

const mSTP = state => ({
  servers: Object.values(state.entities.servers)
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers()),
  getServer: id => dispatch(getServer(id))
});

const ServersIndexContainer = connect(mSTP, mDTP)(ServersIndex);
export default ServersIndexContainer;