import { connect } from "react-redux";
import MessageSettings from "./message_settings";
import { patchMessage, deleteMessage } from "../../actions/messages_actions";

const mDTP = dispatch => ({
  patchMessage: message => dispatch(patchMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId))
});

const MessageSettingsContainer = connect(null, mDTP)(MessageSettings);
export default MessageSettingsContainer;