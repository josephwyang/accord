import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getServer } from "../../actions/servers_actions";
import { postMessage } from "../../actions/messages_actions";
import ServerInviteModal from "./server_invite_modal";
import { firstChannelId } from "../../reducers/channels_selector";

const mSTP = state => ({
  friends: state.entities.friends,
  dms: state.entities.dms,
  firstChannelId
});

const mDTP = dispatch => ({
  getServer: serverId => dispatch(getServer(serverId)),
  postMessage: message => dispatch(postMessage(message))
});

const ServerInviteModalContainer = withRouter(connect(mSTP, mDTP)(ServerInviteModal));
export default ServerInviteModalContainer;