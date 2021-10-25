import { connect } from "react-redux";
import EditMessageForm from "./edit_message_form";
import { deleteMessage, patchMessage } from "../../actions/messages_actions";

const mDTP = dispatch => ({
  patchMessage: message => dispatch(patchMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId))
});

const EditMessageFormContainer = connect(null, mDTP)(EditMessageForm);
export default EditMessageFormContainer;