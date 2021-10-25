import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { firstChannelId } from "../../reducers/channels_selector";

const ServerIndexItem = ({ id, name, icon, getServer, history, match, showBubble, hideBubble, loadIcon }) => {
  const serverIcon = icon ? <img src={icon} alt="icon" /> : name.split(" ").map(word => word[0]).slice(0,2);

  const handleClick = e => {
    e.preventDefault();
    if(match.params.serverId != id) getServer().then(({ payload }) => { history.push(`/channels/${id}/${firstChannelId(payload.channels)}`) });
  }

  return (
    <NavLink to={`/channels/${id}`} onClick={handleClick} activeClassName="selected"
      onMouseEnter={e => showBubble(e.target.y + 24, name)}
      onMouseLeave={() => hideBubble()}>
      {serverIcon}
    </NavLink>
  )
}

export default withRouter(ServerIndexItem);