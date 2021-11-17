import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { firstChannelId } from "../../reducers/channels_selector";

const ServerIndexItem = ({ id, name, icon, getServer, history, match, showBubble, hideBubble, setContext }) => {
  const serverIcon = icon ? <img src={icon} alt="icon" /> : <div>{name.split(" ").map(word => word[0]).slice(0,2)}</div>;

  const handleClick = e => {
    e.preventDefault();
    if(match.params.serverId != id) getServer().then(({ payload }) => { history.push(`/channels/${id}/${firstChannelId(payload.channels)}`) });
  }

  return (
    <NavLink to={`/channels/${id}`} onClick={handleClick} activeClassName="selected" onContextMenu={e => setContext(e)}
      onMouseEnter={e => showBubble(e.target.getBoundingClientRect().y + 24, name)}
      onMouseLeave={() => hideBubble()}>
      {serverIcon}
    </NavLink>
  )
}

export default withRouter(ServerIndexItem);