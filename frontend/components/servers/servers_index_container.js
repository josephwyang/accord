import { connect } from "react-redux";
import ServersIndex from "./servers_index";
import { getServers, getServer, previewServer } from "../../actions/servers_actions"
import { receiveFriend, receiveFriendRequest, receivePendingFriend, removeFriend } from "../../actions/friends_actions";
import { getDms } from "../../actions/dms_actions";
import { receiveMessage, receiveNotification, removeMessage } from "../../actions/messages_actions";

const mSTP = state => ({
  servers: Object.values(state.entities.servers),
  preview: state.entities.preview,
  currentUser: window.currentUser || state.session.currentUser
});

const mDTP = dispatch => ({
  getServers: () => dispatch(getServers()),
  getServer: serverId => dispatch(getServer(serverId)),
  getDms: () => dispatch(getDms()),
  previewServer: serverId => dispatch(previewServer(serverId)),
  receiveFriend: friend => dispatch(receiveFriend(friend)),
  receivePendingFriend: friend => dispatch(receivePendingFriend(friend)),
  receiveFriendRequest: friend => dispatch(receiveFriendRequest(friend)),
  removeFriend: friendshipId => dispatch(removeFriend(friendshipId)),
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveNotification: message => dispatch(receiveNotification(message)),
  removeMessage: messageId => dispatch(removeMessage(messageId))
});

const ServersIndexContainer = connect(mSTP, mDTP)(ServersIndex);
export default ServersIndexContainer;