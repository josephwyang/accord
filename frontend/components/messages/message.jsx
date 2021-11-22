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

const Message = ({ messages, message, i, users, currentUserId, servers, firstChannelId, editing, setEditing, setDeleting, reacting, setReacting,
  getServer, postMembership, postReaction, deleteReaction, reply, formHeight, ...props }) => {

  let dateStamp;
  if (message.date === getDate()) {
    dateStamp = `Today at ${message.time}`;
  } else if (message.date === getDate("yesterday")) {
    dateStamp = `Yesterday at ${message.time}`
  } else { dateStamp = message.date };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(message.date);
  const fullDate = `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear().toString()}`;

  const react = e => {
    const settings = e.target.parentElement.parentElement;
    const settingsY = settings.getBoundingClientRect().y;
    const settingsBuffer = settings.classList.contains("message") ? settings.classList.contains("followup-message") ? 23 : 16 : 0;
    setReacting({ messageId: message.id, top: settingsY - settingsBuffer - 53 });
  };

  const groupedReactions = {};
  if (message.reactions) Object.values(message.reactions).forEach(reaction => {
    groupedReactions[reaction.emoji] ? groupedReactions[reaction.emoji].push(reaction) : groupedReactions[reaction.emoji] = [reaction];
  });

  const currentUserReaction = reactionGroup => {
    for(let reaction of reactionGroup) {
      if (reaction.reactorId === currentUserId) return reaction;
    }
  }

  const haveReacted = ({ emoji }) => groupedReactions[emoji].some(reaction => reaction.reactorId === currentUserId);

  const reactionsList = Object.values(groupedReactions).map((reactionGroup, i) => (
    <li key={`reaction-group-${i}`} className={haveReacted(reactionGroup[0]) ? "reacted" : ""} onClick={() => {
      haveReacted(reactionGroup[0]) ? deleteReaction((currentUserReaction(reactionGroup)).id) : postReaction({
        messageId: message.id,
        reactorId: currentUserId,
        emoji: reactionGroup[0].emoji
      })
    }}>
      <img src={window[reactionGroup[0].emoji]} alt={reactionGroup[0].emoji} />
      <p>{reactionGroup.length}</p>
    </li>
  ));

  const reactions = message.reactions ?
    <ul className="message-reactions">
      {reactionsList}
      <img src={window.reaction} alt="reaction" onClick={react} />
    </ul> : null;

  const scrollToMessage = messageId => {
    const message = document.getElementById(`message-${messageId}`);
    message.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

    message.classList.add("scrolled-to");
    setTimeout(() => message.classList.remove("scrolled-to"), 1800);
  };

  if (users[message.senderId]) {
    return <>
      {i === 0 || message.invitation || message.seconds - Object.values(messages)[i - 1].seconds >= 60 || message.senderId !== Object.values(messages)[i - 1].senderId || message.repliedMessageId ?
      <div key={message.id}>
        {i === 0 || message.date !== Object.values(messages)[i - 1].date ?
          <>
            <hr className="date-break" />
            <p>{fullDate}</p>
          </>
          : null}
        <li id={`message-${message.id}`} key={`message-${message.id}`} className={"message" + (editing === message.id ? " editing" : "") + (reacting.messageId === message.id ? " reacting" : "")}>
          <MessageSettingsContainer message={message} edit={() => setEditing(message.id)} react={react} reply={reply}
            setDeleting={() => setDeleting({ message: message, dateStamp })} formHeight={formHeight} style={{ top: "-16px" }} />
          {message.repliedMessageId ? <div className="replied-message">
            <img src={window.replied} alt="replied" />
            <img src={users[messages[message.repliedMessageId].senderId].profilePhotoUrl || window.logo} alt="profile" />
            <p>{users[messages[message.repliedMessageId].senderId].username}</p>
            <p className="ellipsis" onClick={() => scrollToMessage(messages[message.repliedMessageId].id)}>{messages[message.repliedMessageId].invitation ? "SERVER INVITE" : messages[message.repliedMessageId].body}</p>
          </div> : null}
          <img className="profile-photo" src={users[message.senderId].profilePhotoUrl || window.logo} alt="profile-photo" />
          <div>
            <div className="sender-info">
              <h4 className="ellipsis username">{users[message.senderId].username}</h4>
              <p className={dateStamp.slice(0,1) === "Y" ? "date-stamp yesterday" : "date-stamp"}>{dateStamp}</p>
            </div>
            {message.invitation ? <div className="invitation">
              <p>YOU {message.senderId === currentUserId ? "SENT" : "RECEIVED"} AN INVITE TO JOIN A SERVER</p>
              <div className="content">
                {message.server.icon ? <img className="server-icon" src={message.server.icon} alt="server-icon" /> : <p className="server-icon" style={{ backgroundColor: "#393C43" }}>{message.server.name.split(" ").map(word => word[0]).slice(0, 2)}</p>}
                <p className="ellipsis">{message.server.name}</p>
                {message.invitation && servers.some(server => server.id === message.invitation) ?
                  <button className="joined" onClick={() => {
                    getServer(message.invitation).then(({ payload }) => props.history.push(`/channels/${message.invitation}/${firstChannelId(payload.channels)}`))
                  }}>Joined</button>
                    : <button className="join" onClick={() => {
                  postMembership({ userId: currentUserId, serverId: message.invitation, description: "server" })
                    .then(() => getServer(message.invitation))
                    .then(({ payload }) => props.history.push(`/channels/${message.invitation}/${firstChannelId(payload.channels)}`));
                }}>Join</button>}
              </div>
            </div> : editing === message.id ?
                <EditMessageFormContainer message={message} closeEdit={() => setEditing(null)} setDeleting={() => setDeleting({ message: message, dateStamp })} top={top} />
              : <p className="message-body">{message.body}<span>{message.edited ? "(edited)" : null}</span></p>}
          </div>
          {reactions}
        </li>
      </div>
        : <li id={`message-${message.id}`} key={`message-${message.id}`} className={"message followup-message" + (editing === message.id ? " editing" : "") + (reacting.messageId === message.id ? " reacting" : "")}>
        {editing === message.id ?
          <EditMessageFormContainer message={message} closeEdit={() => setEditing(null)} setDeleting={() => setDeleting({ message: message, dateStamp })} />
          : <>
            <MessageSettingsContainer message={message} edit={() => setEditing(message.id)} react={react} reply={reply}
              setDeleting={() => setDeleting({ message: message, dateStamp })} formHeight={formHeight} style={{ top: "-23px" }} />
            <p className="time-stamp">{message.time}</p>
            <p className="message-body followup-message">{message.body}<span>{message.edited ? "(edited)" : null}</span></p>
          </>}
        {reactions}
      </li>}
    </>
  } else return null;
};

export default Message;