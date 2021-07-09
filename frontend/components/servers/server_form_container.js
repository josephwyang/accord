import { connect } from "react-redux";
import ServerForm from "./server_form";
import { postServer } from "../../actions/servers_actions";
import { currentUser } from "../../reducers/users_selector";

const mSTP = state => ({
  currentUser: currentUser(state) || window.currentUser,
})

const mDTP = dispatch => ({
  postServer: server => dispatch(postServer(server))
})

const ServerFormContainer = connect(mSTP, mDTP)(ServerForm);
export default ServerFormContainer;