import React, { useEffect, useState } from "react";
import DeleteMessageModal from "./delete_message_modal";
import Message from "./message";

const MessagesIndex = ({ users, messages, formHeight, messagesIndex, deleteMessage, scrollToBottom, ...props }) => {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
 
  useEffect(() => {
    if (!messagesIndex.serverId) {
      props.getServer(messagesIndex.id);
    }
  }, [messagesIndex.id]);

  const messagesList = messages.map((message, i) => <Message key={`message-${message.id}`} messages={messages} message={message} i={i} users={users} editing={editing} setEditing={setEditing} setDeleting={setDeleting} />);

  useEffect(() => {
    if (!messages.length || document.querySelectorAll("#messages-index > *").length - 3 !== messages.length) return;
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ul id="messages-index" style={{ "height": `calc(100% - 40px - ${formHeight}px)` }}>
        <div id="messages-buffer" style={{"flex": "1 1 auto"}}></div>
        <div id="welcome-message">
          {messagesIndex.user ? <>
            <img src={messagesIndex.user.profilePhotoUrl || window.logo} alt="profile" />
            <h2>{messagesIndex.user.username}</h2>
            <p>{`This is the beginning of your direct message history with @${messagesIndex.user.username}.`}</p>
          </> : messagesIndex.serverId ? <>
            <div><img src={window.hashtag} alt="#" /></div>
            <h2>{`Welcome to #${messagesIndex.name}!`}</h2>
            <p>{`This is the start of the #${messagesIndex.name} channel.`}</p>
          </> : <>
                <div style={{ backgroundColor: "#19B491" }}><img src={window.group} alt="group" /></div>
            <h2>{messagesIndex.name}</h2>
            <p>{`Welcome to the beginning of the #${messagesIndex.name} group.`}</p>
          </>}
        </div>
        {/* {messagesList} */}
        <BlankMessage />
        <div id="messages-end"></div>
      </ul>

      { deleting ? (
        <DeleteMessageModal deleting={deleting} setDeleting={setDeleting} users={users} deleteMessage={() => deleteMessage(deleting.message.id)} />
      ) : null }
    </>
  )
};

const BlankMessage = () => {
  return (
    <div>
      <li className="message">
        <img className="profile-photo" src="" alt="" />
        <div>
          <div className="sender-info">
            <h4 className="username"></h4>
          </div>
        </div>
      </li>
    </div>
  )
};

export default MessagesIndex;