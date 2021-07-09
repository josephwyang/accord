import React from "react";
import { Link } from "react-router-dom";

const Server = props => {
  const icon = props.photo ? <img src={props.photo} alt="icon" /> : props.name.split(" ").map(word => word[0]).slice(0,2)
  return (
    <Link to={`/@me/${props.id}`}>{icon}</Link>
  )
}

export default Server;