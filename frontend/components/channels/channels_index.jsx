import React from "react";
import { NavLink } from "react-router-dom";

const ChannelsIndex = props => {
  const shownChannels = props.channelHeaderOpen ? props.channels : props.channels.filter(channel => channel.id == props.channelId);

  const channels = (shownChannels.map(channel => (
    <NavLink key={`channel-${channel.id}`} to={`/channels/${props.server.id}/${channel.id}`} activeClassName="selected">
      <span>#</span>{channel.name}
    </NavLink>
  )));

  return (
    <nav id="channels-index" className="nav">
      <div id="server-header" onClick={() => props.toggleOpen("serverHeader")} className={props.serverHeaderOpen ? "selected" : ""}>
        <h1>{props.server.name}</h1>
        <img src={window.downArrow} alt="down-arrow" />
        <img src={window.xButton} alt="x-button" />
      </div>
      <div id="channel-header" onClick={() => props.toggleOpen("channelHeader")} className={props.channelHeaderOpen ? "selected" : ""}>
        <div>
          <img src={window.downArrow} alt="down-arrow" />
          <h2>TEXT CHANNELS</h2>
        </div>
        <p onClick={props.openChannelForm}>+</p>
      </div>
      <ul id="channels-list">
        {channels}
      </ul>
    </nav>
  )
};

export default ChannelsIndex;