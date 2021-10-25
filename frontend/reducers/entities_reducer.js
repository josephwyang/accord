import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import friendsReducer from "./friends_reducer";
import friendRequestsReducer from "./friend_requests_reducer";
import pendingFriendsReducer from "./pending_friends_reducer";
import serversReducer from "./servers_reducer";
import publicServersReducer from "./public_servers_reducer";
import channelsReducer from "./channels_reducer";
import messagesReducer from "./messages_reducer";
import previewReducer from "./preview_reducer";
import dmsReducer from "./dms_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  friends: friendsReducer,
  friendRequests: friendRequestsReducer,
  pendingFriends: pendingFriendsReducer,
  servers: serversReducer,
  publicServers: publicServersReducer,
  preview: previewReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  dms: dmsReducer
});

export default entitiesReducer;