import { connect } from "react-redux";
import ServersIndex from "./servers_index";
import { getServers, getServer, previewServer, postServer, getPublicServers, removePreview } from "../../actions/servers_actions"
import { getFriends, receiveFriend, receiveFriendRequest, receivePendingFriend, removeFriend } from "../../actions/friends_actions";
import { getDms } from "../../actions/dms_actions";
import { receiveMessage, receiveNotification, removeMessage } from "../../actions/messages_actions";
import { postMembership } from "../../actions/memberships_actions";
import { receiveReaction, removeReaction } from "../../actions/reactions_actions";

const mSTP = state => ({
  servers: Object.values(state.entities.servers),
  dms: Object.values(state.entities.dms),
  preview: state.entities.preview,
  currentUser: window.currentUser || state.session.currentUser
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers()),
  getServer: serverId => dispatch(getServer(serverId)),
  getPublicServers: () => dispatch(getPublicServers()),
  previewServer: serverId => dispatch(previewServer(serverId)),
  removePreview: () => dispatch(removePreview()),
  postServer: data => dispatch(postServer(data)),
  getDms: () => dispatch(getDms()),
  getFriends: () => dispatch(getFriends()),
  postMembership: member => dispatch(postMembership(member)),
  receiveFriend: friend => dispatch(receiveFriend(friend)),
  receivePendingFriend: friend => dispatch(receivePendingFriend(friend)),
  receiveFriendRequest: friend => dispatch(receiveFriendRequest(friend)),
  removeFriend: friendshipId => dispatch(removeFriend(friendshipId)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveNotification: message => dispatch(receiveNotification(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId)),
  receiveReaction: reaction => dispatch(receiveReaction(reaction)),
  removeReaction: reaction => dispatch(removeReaction(reaction))
});

const ServersIndexContainer = connect(mSTP, mDTP)(ServersIndex);
export default ServersIndexContainer;