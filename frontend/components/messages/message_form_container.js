import { connect } from "react-redux";
import MessageForm from "./message_form";
import { currentUser } from "../../reducers/users_selector";
import { postMessage } from "../../actions/messages_actions";
import { withRouter } from "react-router-dom";


const mSTP = (state, ownProps) => ({
  currentUserId: currentUser(state).id,
  channel: state.entities.channels[ownProps.match.params.channelId]
});

const mDTP = dispatch => ({
  postMessage: message => dispatch(postMessage(message))
});

const MessageFormContainer = withRouter(connect(mSTP, mDTP)(MessageForm));
export default MessageFormContainer;