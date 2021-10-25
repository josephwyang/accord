import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Channel from "./channel";
import { getChannel } from "../../actions/channels_actions";
import { receiveMessage, removeMessage } from "../../actions/messages_actions";

const mSTP = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.match.params.channelId],
  messages: Object.values(state.entities.messages)
});

const mDTP = (dispatch, ownProps) => ({
  getChannel: () => dispatch(getChannel(ownProps.match.params.channelId)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId))
});

const ChannelContainer = withRouter(connect(mSTP, mDTP)(Channel));
export default ChannelContainer;