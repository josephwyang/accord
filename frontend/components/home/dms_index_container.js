import { connect } from "react-redux";
import { withRouter } from "react-router";
import DmsIndex from "./dms_index";
import { deleteServer, postServer } from "../../actions/servers_actions";
import { postMembership } from "../../actions/memberships_actions";

const mSTP = state => ({
  dms: state.entities.dms,
  friends: Object.values(state.entities.friends),
  currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
  deleteServer: dmId => dispatch(deleteServer(dmId)),
  postServer: data => dispatch(postServer(data)),
  postMembership: membership => dispatch(postMembership(membership))
});

const DmsIndexContainer = connect(mSTP, mDTP)(DmsIndex);
export default withRouter(DmsIndexContainer);