import { connect } from "react-redux";
import { deleteMessage } from "../../actions/messages_actions";
import { getServer } from "../../actions/servers_actions";
import MessagesIndex from "./messages_index";
import { withRouter } from "react-router";

const mSTP = state => ({
  users: state.entities.users,
  messages: Object.values(state.entities.messages)
});

const mDTP = dispatch => ({
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
  getServer: dmId => dispatch(getServer(dmId))
});

const MessagesIndexContainer = withRouter(connect(mSTP, mDTP)(MessagesIndex));
export default MessagesIndexContainer;