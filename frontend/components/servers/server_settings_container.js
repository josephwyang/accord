import { connect } from "react-redux";
import ServerSettings from "./server_settings";
import { deleteServer, patchServer } from "../../actions/servers_actions";
import { withRouter } from "react-router-dom";
import { fullServer } from "../../reducers/servers_selector";

const mSTP = (state, ownProps) => ({
  server: fullServer(state, ownProps.match.params.serverId)
});

const mDTP = (dispatch, ownProps) => ({
  patchServer: server => dispatch(patchServer(server)),
  deleteServer: () => dispatch(deleteServer(ownProps.match.params.serverId))
});

const ServerSettingsContainer = withRouter(connect(mSTP, mDTP)(ServerSettings));
export default ServerSettingsContainer;