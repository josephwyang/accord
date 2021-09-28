import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { firstChannelId } from "../../reducers/channels_selector";

const ServerIndexItem = ({id, name, icon, getServer, history, match}) => {
  const serverIcon = icon ? <img src={icon} alt="icon" /> : name.split(" ").map(word => word[0]).slice(0,2);

  const handleClick = e => {
    e.preventDefault();
    if(match.params.serverId != id) getServer().then(({ payload }) => {history.push(`/channels/${id}/${firstChannelId(payload.channels)}`)});
  }

  return (
    <NavLink to={`/channels/${id}`} onClick={handleClick} activeClassName="selected">
      {serverIcon}
    </NavLink>
  )
}

export default withRouter(ServerIndexItem);