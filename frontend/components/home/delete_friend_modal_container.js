import { connect } from "react-redux";
import deleteFriendModal from "./delete_friend_modal";
import { deleteFriend } from "../../actions/friends_actions";

const mDTP = dispatch => ({
  deleteFriend: friendshipId => dispatch(deleteFriend(friendshipId))
});

const deleteFriendModalContainer = connect(null, mDTP)(deleteFriendModal);
export default deleteFriendModalContainer;