import React from "react";
import { NavLink } from "react-router-dom";

const ServerIndexItem = ({id, name, icon, getServer}) => {
  const serverIcon = icon ? <img src={icon} alt="icon" /> : name.split(" ").map(word => word[0]).slice(0,2);
  return (
    <NavLink to={`/channels/${id}`} activeClassName="selected" onClick={() => getServer()}>{serverIcon}</NavLink>
  )
}

export default ServerIndexItem;