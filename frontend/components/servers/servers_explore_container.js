import { connect } from "react-redux";
import ServersExplore from "./servers_explore";
import { getPublicServers } from "../../actions/servers_actions";
import { publicServersByGenre } from "../../reducers/servers_selector";

const mSTP = state => ({
  serversWithGenre: genre => publicServersByGenre(state, genre)
});

const mDTP = dispatch => ({
  getPublicServers: () => dispatch(getPublicServers())
});

const ServersExploreContainer = connect(mSTP, mDTP)(ServersExplore);
export default ServersExploreContainer;