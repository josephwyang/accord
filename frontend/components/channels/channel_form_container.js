import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelForm from "./channel_form";
import { postChannel, patchChannel } from "../../actions/channels_actions"

const mDTP = dispatch => ({
  postChannel: channel => dispatch(postChannel(channel)),
  patchChannel: channel => dispatch(patchChannel(channel))
});

const ChannelFormContainer = withRouter(connect(null, mDTP)(ChannelForm));
export default ChannelFormContainer;