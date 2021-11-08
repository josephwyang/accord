import { connect } from "react-redux";
import ServersExplore from "./servers_explore";
import { previewServer, getServer } from "../../actions/servers_actions";
import { publicServersByGenre } from "../../reducers/servers_selector";
import { withRouter } from "react-router";

const mSTP = state => ({
  currentUser: state.session.currentUser,
  servers: state.entities.servers,
  publicServers: Object.values(state.entities.publicServers),
  serversWithGenre: genre => publicServersByGenre(state, genre)
});

const mDTP = dispatch => ({
  previewServer: serverId => dispatch(previewServer(serverId)),
  getServer: serverId => dispatch(getServer(serverId))
});

const ServersExploreContainer = withRouter(connect(mSTP, mDTP)(ServersExplore));
export default ServersExploreContainer;