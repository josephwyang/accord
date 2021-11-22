import React, { useEffect } from "react";

const SendInvitation = ({ inviteChannel, server, serverId, channels, currentUserId, postMessage, closeModal, history }) => {
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div id="send-invitation">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <h3>Send Invitation</h3>
        <div>
          {server.icon ? <img src={server.icon} alt="" /> : <div>{server.name.split(" ").map(word => word[0]).slice(0, 2)}</div>}
          <h3 className="ellipsis">{server.name}</h3>
        </div>
        <ul>
          {channels()}
        </ul>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button disabled={!inviteChannel} onClick={() => {
            postMessage({
              senderId: currentUserId,
              channelId: inviteChannel,
              body: "INVITATION",
              invitation: server.id
            }).then(() => {
              closeModal();
              const pathname = `/channels/${serverId}/${inviteChannel}`;
              if(history.location.pathname !== pathname) history.push(pathname);
            });
          }}>Send Invitation</button>
        </div>
      </div>
    </div>
  );
};

export default SendInvitation;