import React, { useEffect } from "react";

const KickMemberModal = ({ member, serverId, deleteMembership, closeModal }) => {
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div id="kick-member-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h3>{`Kick ${member.username}?`}</h3>
          <p>Are you sure you want to kick <span style={{ fontWeight: 900 }}>{member.username}</span> from the server? They will be able to rejoin again with a new invite.</p>
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button onClick={() => {
            closeModal();
            deleteMembership({ serverId, userId: member.id });
          }}>Kick</button>
        </div>
      </div>
    </div>
  );
};

export default KickMemberModal;