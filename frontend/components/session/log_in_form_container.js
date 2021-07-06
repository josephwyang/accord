import { connect } from "react-redux";
import LogInForm from "./log_in_form";
import { logInUser } from "../../actions/session_actions";

const mSTP = ({ errors }) => ({
  errors
});

const mDTP = dispatch => ({
  logInUser: user => dispatch(logInUser(user))
});

const LogInFormContainer = connect(mSTP, mDTP)(LogInForm);
export default LogInFormContainer;