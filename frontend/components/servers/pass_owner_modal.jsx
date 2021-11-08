import React, { useEffect } from "react";

const PassOwnerModal = ({ member, owner, server, passOwner, closeModal }) => {
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div id="pass-owner-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h3 style={{ textAlign:"center" }}>Transfer Ownership</h3>
          <p style={{ textAlign:"center"}}>Ownership of {server.name} will be transferred to {member.username}</p>
          <div id="transfer-ownership-diagram">
            <img src={window.transfer} alt="transfer" />
            <div>
              <img src={owner.profilePhotoUrl || window.logo} alt="profile" />
              <img src={member.profilePhotoUrl || window.logo} alt="profile" />
            </div>
          </div>
          <p>Are you sure you want to pass ownership of the server to <span style={{ fontWeight: 900 }}>{member.username}</span>? Only they can pass ownership again.</p>
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button onClick={() => {
            closeModal();
            passOwner();
          }}>Transfer Ownership</button>
        </div>
      </div>
    </div>
  );
};

export default PassOwnerModal;