import { connect } from "react-redux";
import MembersIndex from "./members_index";
import { postMessage } from "../../actions/messages_actions";

const mSTP = state => ({
  currentUserId: state.session.currentUser.id,
  members: Object.values(state.entities.users)
});

const mDTP = dispatch => ({
  postMessage: message => dispatch(postMessage(message))
});

const MembersIndexContainer = connect(mSTP, mDTP)(MembersIndex);
export default MembersIndexContainer;