import { RECEIVE_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/messages_actions";

const notificationsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_NOTIFICATION:
      const { senderId, server: {id: dmId}, body, invitation, username, profilePhotoUrl } = action.message;
      return { senderId, dmId, body, invitation, username, profilePhotoUrl };
    case REMOVE_NOTIFICATION:
      return {};
    default:
      return state;
  }
};

export default notificationsReducer;