import { connect } from "react-redux";
import ServersExplore from "./servers_explore";
import { previewServer, getServer, getPublicServers } from "../../actions/servers_actions";
import { publicServersByGenre } from "../../reducers/servers_selector";
import { withRouter } from "react-router";

const mSTP = state => ({
  currentUser: state.session.currentUser,
  servers: state.entities.servers,
  serversWithGenre: genre => publicServersByGenre(state, genre)
});

const mDTP = dispatch => ({
  previewServer: serverId => dispatch(previewServer(serverId)),
  getServer: serverId => dispatch(getServer(serverId)),
  getPublicServers: () => dispatch(getPublicServers())
});

const ServersExploreContainer = withRouter(connect(mSTP, mDTP)(ServersExplore));
export default ServersExploreContainer;