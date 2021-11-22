import DeleteChannelModal from "./delete_channel_modal";
import { connect } from "react-redux";
import { deleteChannel } from "../../actions/channels_actions";
import { firstChannelId } from "../../reducers/channels_selector";
import { withRouter } from "react-router";

const mSTP = state => ({
  channels: Object.values(state.entities.channels),
  firstChannelId
});

const mDTP = dispatch => ({
  deleteChannel: channelId => dispatch(deleteChannel(channelId))
});

const DeleteChannelModalContainer = withRouter(connect(mSTP, mDTP)(DeleteChannelModal));
export default DeleteChannelModalContainer;