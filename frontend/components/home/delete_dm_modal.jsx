import React, { useEffect } from "react";

const DeleteDmModal = ({ deleting, handleDelete, closeModal }) => {
  const handleKey = e => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Enter") {
      handleDelete();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="delete-server-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h1>Delete {deleting.name ? <span style={{ fontWeight: 900 }}>{deleting.name}</span> : "direct message"}?</h1>
          <p>Are you sure you want to delete {deleting.name ? "" : "your conversation with "}<span>{deleting.name || deleting.user.username}</span>? This action cannot be undone.</p>
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button onClick={handleDelete} autoFocus >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDmModal;