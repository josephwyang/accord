import { connect } from "react-redux";
import { currentUser } from "../../reducers/users_selector";
import Profile from "./profile";

const mSTP = state => ({
  currentUser: currentUser(state)
});

const ProfileContainer = connect(mSTP)(Profile);
export default ProfileContainer;