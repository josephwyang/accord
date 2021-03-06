import { connect } from "react-redux";
import ServerForm from "./server_form";
import { postServer } from "../../actions/servers_actions";
import { withRouter } from "react-router";

const mSTP = state => ({
  currentUser: state.session.currentUser,
})

const mDTP = dispatch => ({
  postServer: server => dispatch(postServer(server))
})

const ServerFormContainer = withRouter(connect(mSTP, mDTP)(ServerForm));
export default ServerFormContainer;