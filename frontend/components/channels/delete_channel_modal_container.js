import DeleteChannelModal from "./delete_channel_modal";
import { connect } from "react-redux";
import { deleteChannel } from "../../actions/channels_actions";

const mDTP = dispatch => ({
  deleteChannel: channelId => dispatch(deleteChannel(channelId))
});

const DeleteChannelModalContainer = connect(null, mDTP)(DeleteChannelModal);
export default DeleteChannelModalContainer;