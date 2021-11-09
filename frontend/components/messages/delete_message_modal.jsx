import React, { useEffect } from "react";

const DeleteMessageModal = ({ deleting, setDeleting, deleteMessage, replying, closeReply, users }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return (() => window.removeEventListener("keydown", handleKeyDown));
  }, [])

  const handleKeyDown = e => {
    if (e.key === "Escape") { setDeleting(null); }
    else if (e.key === "Enter") {
      deleteMessage();
      setDeleting(null);
      if(deleting.message.id === replying.messageId) closeReply();
    }
  }

  return (
    <div id="delete-message-modal">
      <div className="modal-screen" onClick={() => setDeleting(null)}></div>
      <div className="settings-modal">
        <div className="settings-modal-message">
          <h1>Delete Message</h1>
          <p>Are you sure you want to delete this message?</p>
        </div>
        <div id="message-preview">
          <img className="profile-photo" src={users[deleting.message.senderId].profilePhotoUrl || window.logo} alt="profile-photo" />
          <div>
            <div className="sender-info">
              <h4 className="username">{users[deleting.message.senderId].username}</h4>
              <p className={deleting.dateStamp.slice(0, 1) === "Y" ? "date-stamp yesterday" : "date-stamp"}>{deleting.dateStamp}</p>
            </div>
            <p className="message-body">{deleting.message.body}</p>
          </div>
        </div>
        <div className="form-nav">
          <p onClick={() => setDeleting(null)}>Cancel</p>
          <button onClick={() => {
            deleteMessage();
            setDeleting(null);
            if (replying && deleting.message.id === replying.messageId) closeReply();
          }}>Delete</button>
        </div>
      </div>
    </div>
  )
};

export default DeleteMessageModal;