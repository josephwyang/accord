import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Channel from "./channel";
import { getChannel } from "../../actions/channels_actions";
import { receiveMessage, receiveNotification, removeMessage, removeNotification } from "../../actions/messages_actions";
import { receiveReaction, removeReaction } from "../../actions/reactions_actions";

const mSTP = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  messages: Object.values(state.entities.messages),
  currentChannel: state.session.currentChannel,
  currentUserId: state.session.currentUser.id
});

const mDTP = (dispatch, ownProps) => ({
  getChannel: () => dispatch(getChannel(ownProps.match.params.channelId)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveNotification: message => dispatch(receiveNotification(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId)),
  removeNotification: () => dispatch(removeNotification()),
  receiveReaction: reaction => dispatch(receiveReaction(reaction)),
  removeReaction: reaction => dispatch(removeReaction(reaction))
});

const ChannelContainer = withRouter(connect(mSTP, mDTP)(Channel));
export default ChannelContainer;