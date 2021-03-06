import { connect } from "react-redux";
import MessageForm from "./message_form";
import { postMessage } from "../../actions/messages_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId];
  const dm = state.entities.dms[ownProps.match.params.dmId];
  
  return ({
    servers: state.entities.servers,
    currentUserId: state.session.currentUser.id,
    channel,
    dm,
    channelId: channel || dm ? channel ? channel.id : dm.channelId : undefined
  })
};

const mDTP = dispatch => ({
  postMessage: message => dispatch(postMessage(message))
});

const MessageFormContainer = withRouter(connect(mSTP, mDTP)(MessageForm));
export default MessageFormContainer;