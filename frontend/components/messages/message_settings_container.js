import { connect } from "react-redux";
import MessageSettings from "./message_settings";

const mSTP = state => ({
  currentUserId: state.session.currentUser.id
});

const MessageSettingsContainer = connect(mSTP)(MessageSettings);
export default MessageSettingsContainer;