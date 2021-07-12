import React from "react";
import { NavLink } from "react-router-dom";

const ServerIndexItem = props => {
  const icon = props.photo ? <img src={props.photo} alt="icon" /> : props.name.split(" ").map(word => word[0]).slice(0,2)
  return (
    <NavLink to={`/channels/${props.id}`} activeClassName="selected" onClick={() => props.getServer()}>{icon}</NavLink>
  )
}

export default ServerIndexItem;