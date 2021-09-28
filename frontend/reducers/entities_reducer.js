import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import serversReducer from "./servers_reducer";
import publicServersReducer from "./public_servers_reducer";
import channelsReducer from "./channels_reducer";
import messagesReducer from "./messages_reducer";
import previewReducer from "./preview_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  servers: serversReducer,
  publicServers: publicServersReducer,
  preview: previewReducer,
  channels: channelsReducer,
  messages: messagesReducer
});

export default entitiesReducer;