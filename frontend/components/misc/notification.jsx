import React from "react";

const Notification = ({ notification, removeNotification, history }) => {
  return (
    <div id="notification" onClick={e => {
      if (e.target.id !== "close-notification") {
        history.push(`/@me/${notification.dmId}`);
        removeNotification();
      }
    }}>
      <img id="close-notification" src={window.xButton} alt="X" onClick={removeNotification} />
      <img src={notification.profilePhotoUrl || window.logo} alt="profile" />
      <div>
        <p className="ellipsis">{notification.username}</p>
        <p>{notification.invitation ? "You have been invited to a server." : notification.body}</p>
      </div>
    </div>
  );
};

export default Notification;