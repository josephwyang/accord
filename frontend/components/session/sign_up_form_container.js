import { connect } from "react-redux";
import SessionForm from "./session_form";
import { postUser } from "../../actions/session_actions";

const mSTP = ({ errors }) => ({
  title: "Create an account",
  buttonLabel: "Continue",
  errors
});

const mDTP = dispatch => ({
  submit: user => dispatch(postUser(user))
});

const SignUpFormContainer = connect(mSTP, mDTP)(SessionForm);
export default SignUpFormContainer;