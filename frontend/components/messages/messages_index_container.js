import { connect } from "react-redux";
import MessagesIndex from "./messages_index";

const mSTP = state => ({
  users: state.entities.users,
  messages: Object.values(state.entities.messages)
});

const MessagesIndexContainer = connect(mSTP)(MessagesIndex);
export default MessagesIndexContainer;