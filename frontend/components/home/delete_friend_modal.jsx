import React, { useEffect } from "react";

const DeleteFriendModal = ({ friend, deleteFriend, closeModal }) => {
  const handleEsc = e => { if (e.key === "Escape") closeModal(); };

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  const handleClick = () => {
    deleteFriend(friend.friendshipId);
    closeModal();
  }

  return (
    <div id="delete-friend-modal">
      <div className="modal-screen" onClick={closeModal}></div>
      <form className="settings-modal" onSubmit={handleClick}>
        <div className="settings-modal-message">
          <h1>{`Remove "${friend.username}"`}</h1>
          <p>Are you sure you want to permanently remove <span>{friend.username}</span> from your friends?</p>
        </div>
        <div className="form-nav">
          <p onClick={closeModal}>Cancel</p>
          <button>Remove Friend</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteFriendModal;