import { connect } from "react-redux";
import SessionForm from "./session_form";
import { logInUser } from "../../actions/session_actions";

const mSTP = ({ errors }) => ({
  title: "Welcome back!",
  subheader: "We're so excited to see you again!",
  buttonLabel: "Login",
  errors
});

const mDTP = dispatch => ({
  submit: user => dispatch(logInUser(user))
});

const LogInFormContainer = connect(mSTP, mDTP)(SessionForm);
export default LogInFormContainer;