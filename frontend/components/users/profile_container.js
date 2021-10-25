import { connect } from "react-redux";
import Profile from "./profile";

const mSTP = state => ({
  currentUser: window.currentUser || state.session.currentUser,
});

const ProfileContainer = connect(mSTP)(Profile);
export default ProfileContainer;