import { connect } from "react-redux";
import { withRouter } from "react-router";
import DmsIndex from "./dms_index";
import { deleteServer, patchServer } from "../../actions/servers_actions";
import { acceptFriendship, deleteFriend, requestFriendship } from "../../actions/friends_actions";
import { postMessage } from "../../actions/messages_actions";
import { removeCurrentChannel } from "../../actions/session_actions";

const mSTP = state => ({
  dms: state.entities.dms,
  servers: Object.values(state.entities.servers),
  friends: Object.values(state.entities.friends),
  friendRequests: Object.values(state.entities.friendRequests),
  pendingFriends: Object.values(state.entities.pendingFriends),
  currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
  patchServer: server => dispatch(patchServer(server)),
  deleteServer: dmId => dispatch(deleteServer(dmId)),
  postMessage: message => dispatch(postMessage(message)),
  requestFriendship: tag => dispatch(requestFriendship(tag)),
  acceptFriendship: friendshipId => dispatch(acceptFriendship(friendshipId)),
  deleteFriendFunc: friendshipId => dispatch(deleteFriend(friendshipId)),
  removeCurrentChannel: () => dispatch(removeCurrentChannel())
});

const DmsIndexContainer = connect(mSTP, mDTP)(DmsIndex);
export default withRouter(DmsIndexContainer);