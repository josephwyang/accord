import { connect } from "react-redux";
import Splash from "./splash";
import { logOutUser } from "../../actions/session_actions";

const mSTP = state => ({
  loggedIn: Boolean(state.session.currentUserId)
});

const mDTP = dispatch => ({
  logOut: () => dispatch(logOutUser())
});

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;