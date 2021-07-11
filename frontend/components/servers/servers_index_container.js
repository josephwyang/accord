import { connect } from "react-redux";
import ServersIndex from "./servers_index";
import { getServers } from "../../actions/servers_actions"

const mSTP = state => ({
  servers: Object.values(state.entities.servers)
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers())
});

const ServersIndexContainer = connect(mSTP, mDTP)(ServersIndex);
export default ServersIndexContainer;