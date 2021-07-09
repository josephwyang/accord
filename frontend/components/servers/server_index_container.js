import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { getServers } from "../../actions/servers_actions"

const mSTP = state => ({
  servers: Object.values(state.entities.servers)
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers())
});

const ServerIndexContainer = connect(mSTP, mDTP)(ServerIndex);
export default ServerIndexContainer;