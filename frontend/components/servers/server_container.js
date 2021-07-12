import { connect } from "react-redux";
import { getServer } from "../../actions/servers_actions";
import Server from "./server";

const mSTP = (state, ownProps) => ({
  server: state.entities.servers[ownProps.match.params.serverId],
  channels: Object.values(state.entities.channels)
});

const mDTP = (dispatch, ownProps) => ({
  getServer: () => dispatch(getServer(ownProps.match.params.serverId))
});

const ServerContainer = connect(mSTP, mDTP)(Server);
export default ServerContainer;