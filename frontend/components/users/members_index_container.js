import { connect } from "react-redux";
import MembersIndex from "./members_index";

const mSTP = state => ({
  members: Object.values(state.entities.users)
});

const MembersIndexContainer = connect(mSTP)(MembersIndex);
export default MembersIndexContainer;