import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteChannelModalContainer from "./delete_channel_modal_container";

function ChannelsIndex(props) {
  const [deleteModal, setDeleteModal] = useState(null);
  const shownChannels = props.channelHeaderOpen ? props.channels : props.channels.filter(channel => channel.id == props.channelId);

  const contextOptions = channel => [
    { text: "Create Text Channel", color: "blue", function: () => props.openChannelForm() },
    { text: "Edit Channel", function: () => props.openChannelForm({ id: channel.id, name: channel.name }) },
    { text: "Delete Channel", color: "red" , function: () => setDeleteModal(channel) }
  ];

  const channels = (shownChannels.map(channel => (
    <NavLink key={`channel-${channel.id}`} to={`/channels/${props.server.id}/${channel.id}`} className="ellipsis" activeClassName="selected"
      onContextMenu={e => props.setContext(e, contextOptions(channel))}>
      <span>#</span>{channel.name}
    </NavLink>
  )));

  return (
    <>
      <nav id="channels-index" className="nav">
        <div id="server-header" onClick={() => {props.isPreview ? null : props.toggleOpen("serverHeader")}} style={{ cursor: props.isPreview ? "not-allowed" : null }}
          className={props.serverHeaderOpen ? "selected" : ""}>
          <h1 className="ellipsis">{props.server.name}</h1>
          <img src={window.downArrow} alt="down-arrow" />
          <img src={window.xButton} alt="x-button" />
        </div>
        <div id="channels-index-header">
          <p className={props.isPreview ? "locked-by-preview" : ""} onClick={() => {props.isPreview ? null : props.openChannelForm()}}>+</p>
          <div onClick={() => props.toggleOpen("channelHeader")} className={props.channelHeaderOpen ? "selected" : ""}>
            <img src={window.downArrow} alt="down-arrow" />
            <h2>TEXT CHANNELS</h2>
          </div>
        </div>
        <ul id="channels-list">
          {channels}
        </ul>
      </nav>

      {deleteModal ? <DeleteChannelModalContainer channel={deleteModal} closeModal={() => setDeleteModal(null)} /> : null}
    </>
  );
}

export default ChannelsIndex;