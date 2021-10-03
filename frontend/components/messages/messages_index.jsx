import React, { useEffect } from "react";
import MessageSettingsContainer from "./message_form_container";

const MessagesIndex = ({ users, messages, formHeight, channelName }) => {
  const getDate = (day) => {
    const yesterday = () => {
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    };

    const date = day === "yesterday" ? new Date(yesterday()) : new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = date.getFullYear().toString().slice(2);

    return mm + "/" + dd + "/" + yy;
  }

  const messagesList = messages.map((message, i) => {
    let dateStamp;
    if (message.date === getDate()) {
      dateStamp = `Today at ${message.time}`;
    } else if (message.date === getDate("yesterday")) {
      dateStamp = `Yesterday at ${message.time}`
    } else { dateStamp = message.date };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(message.date);
    const fullDate = `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear().toString()}`;

    if (users[message.senderId]) {
      return (
        i === 0 || message.seconds - messages[i - 1].seconds >= 60 ?
          <div key={message.id}>
            {i === 0 || message.date !== messages[i - 1].date ?
              <>
                <hr className="date-break" />
                <p>{fullDate}</p>
              </>
              : null}

            <li key={`message-${message.id}`} className="message">
              <MessageSettingsContainer message={message} />
              <img className="profile-photo" src={users[message.senderId].profilePhotoUrl || window.logo} alt="profile-photo" />
              <div>
                <div className="sender-info">
                  <h4 className="username">{users[message.senderId].username}</h4>
                  <p className={dateStamp.slice(0,1) === "Y" ? "date-stamp yesterday" : "date-stamp"}>{dateStamp}</p>
                </div>
                <p className="message-body">{message.body}</p>
              </div>
            </li>
          </div>
          : <li key={`message-${message.id}`} className="message followup-message">
            <MessageSettingsContainer message={message} />
            <p className="time-stamp">{message.time}</p>
            <p className="message-body followup-message">{message.body}</p>
          </li>
      )
    }
  })

  useEffect(() => {
    document.getElementById("messages-end").scrollIntoView({ behavior: "instant" });
  });

  return (
    <ul id="messages-index" style={{ "height": `calc(100% - 93px - ${formHeight}px)` }}>
      <div id="messages-buffer" style={{"flex": "1 1 auto"}}></div>
      <div id="welcome-message">
        <div><img src={window.hashtag} alt="#" /></div>
        <h2>{`Welcome to #${channelName}!`}</h2>
        <p>{`This is the start of the #${channelName} channel.`}</p>
      </div>
      {messagesList}
      <div id="messages-end"></div>
    </ul>
  )
};

export default MessagesIndex;