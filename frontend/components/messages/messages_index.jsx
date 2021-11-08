import React, { useEffect, useState } from "react";
import DeleteMessageModal from "./delete_message_modal";
import Message from "./message";
import Reactions from "../misc/reactions";

const MessagesIndex = ({ users, messages, formHeight, messagesIndex, deleteMessage, scrollToBottom, currentUserId, replying, setReplying, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [reacting, setReacting] = useState({ messageId: null, top: null });
 
  useEffect(() => { document.querySelector("#message-form > span").focus() }, []);

  useEffect(() => {
    if (!messagesIndex.serverId) props.getServer(messagesIndex.id).then(() => {
      setLoading(false);
      scrollToBottom();
    });
    setReplying(null);
  }, [messagesIndex.id]);

  const messagesList = Object.values(messages).map((message, i) => <Message key={`message-${message.id}`} messages={messages} message={message} i={i} users={users} currentUserId={currentUserId}
    editing={editing} setEditing={setEditing} setDeleting={setDeleting} reacting={reacting} setReacting={setReacting} postReaction={props.postReaction} deleteReaction={props.deleteReaction}
    reply={() => setReplying({ messageId: message.id, username: users[message.senderId].username })} formHeight={formHeight} />);

  return (
    <>
      <ul id="messages-index" className = {reacting.messageId ? "reacting" : ""} style={{ "height": `calc(100% - 40px - ${formHeight}px${replying ? " - 34px" : ""})` }}>
        <div id="messages-buffer" style={{"flex": "1 1 auto"}}></div>
        {loading ? null
        : <>
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
          {messagesList}
        </> }
        <div id="messages-end"></div>
      </ul>

      { deleting ? (
        <DeleteMessageModal deleting={deleting} setDeleting={setDeleting} replying={replying} closeReply={() => setReplying(null)} users={users} deleteMessage={() => deleteMessage(deleting.message.id)} />
      ) : null }

      {reacting.messageId ? <Reactions messageId={reacting.messageId} top={reacting.top} closeForm={() => setReacting({ messageId: null, top: null })}
        currentUserId={currentUserId} postReaction={props.postReaction} /> : null}
    </>
  )
};

export default MessagesIndex;