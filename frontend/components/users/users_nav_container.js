import { connect } from "react-redux";
import UsersNav from "./users_nav";
import { getUsers } from "../../actions/users_actions";

const mSTP = state => ({
  users: Object.values(state.entities.users)
});

const mDTP = dispatch => ({
  getUsers: () => dispatch(getUsers())
});

const SignUpFormContainer = connect(mSTP, mDTP)(UsersNav);
export default SignUpFormContainer;