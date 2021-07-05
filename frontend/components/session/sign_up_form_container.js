import { connect } from "react-redux";
import SignUpForm from "./sign_up_form";
import { postUser } from "../../actions/users_actions";

const mSTP = ({ errors }) => ({
  errors
})

const mDTP = dispatch => ({
  postUser: user => dispatch(postUser(user))
});

const SignUpFormContainer = connect(mSTP, mDTP)(SignUpForm);
export default SignUpFormContainer;