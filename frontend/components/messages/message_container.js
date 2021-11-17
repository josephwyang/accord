import { connect } from "react-redux";
import { withRouter } from "react-router";
import { postMembership } from "../../actions/memberships_actions";
import { deleteReaction } from "../../actions/reactions_actions";
import { getServer } from "../../actions/servers_actions";
import { firstChannelId } from "../../reducers/channels_selector";
import Message from "./message";

const mSTP = state => ({
  servers: Object.values(state.entities.servers),
  firstChannelId
});

const mDTP = dispatch => ({
  getServer: serverId => dispatch(getServer(serverId)),
  postMembership: membership => dispatch(postMembership(membership)),
  deleteReaction: reactionId => dispatch(deleteReaction(reactionId))
});

const MessageContainer = withRouter(connect(mSTP, mDTP)(Message));
export default MessageContainer;