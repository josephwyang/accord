import React from "react";
import EditMessageFormContainer from "./edit_message_form_container";
import MessageSettingsContainer from "./message_settings_container";

const getDate = day => {
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

const Message = ({ messages, message, i, users, editing, setEditing, setDeleting }) => {
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
      i === 0 || message.seconds - messages[i - 1].seconds >= 60 || message.senderId !== messages[i - 1].senderId ?

      <div key={message.id}>
        {i === 0 || message.date !== messages[i - 1].date ?
          <>
            <hr className="date-break" />
            <p>{fullDate}</p>
          </>
          : null}

        <li key={`message-${message.id}`} className={editing === message.id ? "message editing" : "message"}>
            <MessageSettingsContainer message={message} edit={() => setEditing(message.id)}
              setDeleting={() => setDeleting({ message: message, dateStamp })} style={{ top: "-16px" }} />
          <img className="profile-photo" src={users[message.senderId].profilePhotoUrl || window.logo} alt="profile-photo" />
          <div>
            <div className="sender-info">
              <h4 className="username">{users[message.senderId].username}</h4>
              <p className={dateStamp.slice(0,1) === "Y" ? "date-stamp yesterday" : "date-stamp"}>{dateStamp}</p>
            </div>
            {editing === message.id ?
                <EditMessageFormContainer message={message} closeEdit={() => setEditing(null)} setDeleting={() => setDeleting({ message: message, dateStamp })} />
              : <p className="message-body">{message.body}<span>{message.edited ? "(edited)" : null}</span></p> }
          </div>
        </li>
      </div>

        : <li key={`message-${message.id}`} className={editing === message.id ? "message followup-message editing" : "message followup-message"}>
          {editing === message.id ?
            <EditMessageFormContainer message={message} closeEdit={() => setEditing(null)} setDeleting={() => setDeleting({ message: message, dateStamp })} />
            : <>
              <MessageSettingsContainer message={message} edit={() => setEditing(message.id)}
                setDeleting={() => setDeleting({ message: message, dateStamp })} style={{ top: "-23px" }} />
              <p className="time-stamp">{message.time}</p>
              <p className="message-body followup-message">{message.body}<span>{message.edited ? "(edited)" : null}</span></p>
            </>
            }
      </li>
    )
  } else return null;
};

export default Message;