import { connect } from "react-redux";
import { getServer } from "../../actions/servers_actions";
import { deleteMessage } from "../../actions/messages_actions";
import { postReaction } from "../../actions/reactions_actions";
import MessagesIndex from "./messages_index";
import { withRouter } from "react-router";

const mSTP = state => ({
  users: state.entities.users,
  messages: state.entities.messages,
  currentUserId: state.session.currentUser.id
});

const mDTP = dispatch => ({
  getServer: dmId => dispatch(getServer(dmId)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
  postReaction: reaction => dispatch(postReaction(reaction))
});

const MessagesIndexContainer = withRouter(connect(mSTP, mDTP)(MessagesIndex));
export default MessagesIndexContainer;