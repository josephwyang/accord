import { connect } from "react-redux";
import MembersIndex from "./members_index";
import { postMessage } from "../../actions/messages_actions";
import { acceptFriendship, deleteFriend, requestFriendship } from "../../actions/friends_actions";

const mSTP = state => ({
  currentUserId: state.session.currentUser.id,
  members: Object.values(state.entities.users),
  friends: Object.values(state.entities.friends),
  friendRequests: Object.values(state.entities.friendRequests),
  pendingFriends: Object.values(state.entities.pendingFriends)
});

const mDTP = dispatch => ({
  postMessage: message => dispatch(postMessage(message)),
  requestFriendship: tag => dispatch(requestFriendship(tag)),
  acceptFriendship: friendshipId => dispatch(acceptFriendship(friendshipId)),
  deleteFriendFunc: friendshipId => dispatch(deleteFriend(friendshipId))
});

const MembersIndexContainer = connect(mSTP, mDTP)(MembersIndex);
export default MembersIndexContainer;