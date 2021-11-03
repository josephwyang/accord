import { connect } from "react-redux";
import { withRouter } from "react-router";
import DmsIndex from "./dms_index";
import { deleteServer } from "../../actions/servers_actions";

const mSTP = state => ({
  dms: state.entities.dms,
  friends: Object.values(state.entities.friends),
  currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
  deleteServer: dmId => dispatch(deleteServer(dmId))
});

const DmsIndexContainer = connect(mSTP, mDTP)(DmsIndex);
export default withRouter(DmsIndexContainer);