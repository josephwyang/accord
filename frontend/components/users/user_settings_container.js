import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSettings from "./user_settings";
import { logOutUser } from "../../actions/session_actions";

const mSTP = state => ({
  currentUser: state.session.currentUser,
});

const mDTP = dispatch => ({
  logOut: () => dispatch(logOutUser())
});

const UserSettingsContainer = withRouter(connect(mSTP, mDTP)(UserSettings));
export default UserSettingsContainer;