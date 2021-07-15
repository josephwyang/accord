import React from "react";

const MessagesIndex = ({ users, messages }) => {
  const messagesList = messages.map(message => {
    if (users[message.senderId]) {
      return (<li key={`message-${message.id}`} className="message">
        <img className="profile-photo" src={users[message.senderId].profilePhotoUrl || window.logo} alt="profile-photo" />
        <div className="sender-info">
          <h4 className="username">{users[message.senderId].username}</h4>
          <p className="time-stamp">{message.date}</p>
        </div>
        <p className="message-body">{message.body}</p>
      </li>)
    }
  })

  return (
    <ul id="messages-index">
      {messagesList}
    </ul>
  )
};

export default MessagesIndex;