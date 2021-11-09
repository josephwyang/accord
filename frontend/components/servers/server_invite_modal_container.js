import { connect } from "react-redux";
import { postMembership } from "../../actions/memberships_actions";
import ServerInviteModal from "./server_invite_modal";

const mSTP = state => ({
  friends: state.entities.friends,
  dms: state.entities.dms
});

const mDTP = dispatch => ({
  postMembership: membership => dispatch(postMembership(membership))
});

const ServerInviteModalContainer = connect(mSTP, mDTP)(ServerInviteModal);
export default ServerInviteModalContainer;