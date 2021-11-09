import { connect } from "react-redux";
import { withRouter } from "react-router";
import { acceptFriendship, deleteFriend, requestFriendship } from "../../actions/friends_actions";
import FriendsNav from "./friends_nav";

const mSTP = state => ({
  friends: Object.values(state.entities.friends),
  dms: Object.values(state.entities.dms),
  pendingFriends: Object.values(state.entities.pendingFriends),
  friendRequests: Object.values(state.entities.friendRequests),
  currentUserId: state.session.currentUser.id
})

const mDTP = dispatch => ({
  requestFriendship: tag => dispatch(requestFriendship(tag)),
  acceptFriendship: friendshipId => dispatch(acceptFriendship(friendshipId)),
  deleteFriend: friendshipId => dispatch(deleteFriend(friendshipId))
})

const FriendsNavContainer = withRouter(connect(mSTP, mDTP)(FriendsNav));
export default FriendsNavContainer;