import React, { useEffect } from "react";

const DeleteChannelModal = ({ channels, firstChannelId, channel, deleteChannel, closeModal, ...props }) => {
  const handleEsc = e => {
    if (e.key === "Escape" || e.key === "Enter") closeModal();
    if (e.key === "Enter") deleteChannel(channel.id);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  return (
    <div id="delete-channel-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h3 className="ellipsis">Delete '{channel.name}'?</h3>
          <p>
            Are you sure you want to delete
            <span style={{ marginLeft: "4px", fontWeight: 900 }} >#{channel.name}</span>
            ? This cannot be undone.
          </p>
        </div>

        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button onClick={() => {
            closeModal();
            deleteChannel(channel.id);
            console.log(`/channels/${channel.serverId}/${firstChannelId(channels)}`)
            props.history.push(`/channels/${channel.serverId}/${firstChannelId(channels)}`);
          }}>Delete Channel</button>
        </div>
      </div>
    </div>
  )
};

export default DeleteChannelModal;