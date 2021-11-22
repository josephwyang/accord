import React, { useEffect } from "react";

const LeaveServerModal = ({ server, currentUserId, isOwner, deleteMembership, closeModal, ...props }) => {
  useEffect(() => {
    window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); })
    return window.removeEventListener("keydown", e => { if (e.key === "Escape") closeModal(); })
  }, []);

  return (
    <div id="leave-server-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h3 className="ellipsis">{`Leave '${server.name}'`}</h3>
          {isOwner ?
            <p>You cannot leave a server if you are the owner. You must first give ownership to another member.</p>
            : <p>Are you sure you want to leave <span style={{ fontWeight: 900 }}>{server.name}</span>? You won't be able to rejoin this server unless you are re-invited.</p>}
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button onClick={() => {
            closeModal();
            deleteMembership({ serverId: server.id, userId: currentUserId }).then(() => props.history.push("/@me"));
          }} disabled={isOwner}>Leave Server</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveServerModal;