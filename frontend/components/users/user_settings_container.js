import { connect } from "react-redux";
import { withRouter } from "react-router";
import UserSettings from "./user_settings";
import { patchUser, verifyPhoneNumber,logOutUser } from "../../actions/session_actions";

const mSTP = state => ({
  currentUser: state.session.currentUser,
  verificationCode: state.session.verificationCode,
  errors: state.errors
});

const mDTP = dispatch => ({
  patchUser: data => dispatch(patchUser(data)),
  verifyPhoneNumber: phoneNumber => dispatch(verifyPhoneNumber(phoneNumber)),
  logOut: () => dispatch(logOutUser())
});

const UserSettingsContainer = withRouter(connect(mSTP, mDTP)(UserSettings));
export default UserSettingsContainer;