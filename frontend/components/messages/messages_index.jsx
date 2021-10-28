import React, { useEffect, useState } from "react";
import DeleteMessageModal from "./delete_message_modal";
import Message from "./message";

const MessagesIndex = ({ users, messages, formHeight, messagesIndex, deleteMessage, scrollToBottom, ...props }) => {
  // const [loading, setLoading] = useState(props.loading === false ? false : true);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
 
  useEffect(() => {
    if (!messagesIndex.serverId) {
      // setLoading(true);
      props.getServer(messagesIndex.id).then(() => setLoading(false));
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
        {/* {new Array(Math.floor(Math.random() * 5 + 2)).fill(null).map((x, i) => <BlankMessage key={i} hasMembersIndex={!!messagesIndex.serverId} />)} */}
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
        <DeleteMessageModal deleting={deleting} setDeleting={setDeleting} users={users} deleteMessage={() => deleteMessage(deleting.message.id)} />
      ) : null }
    </>
  )
};

const BlankMessage = ({ hasMembersIndex }) => {
  console.log(hasMembersIndex);
  const [blankBodies, setBlankBodies] = useState(new Array(Math.floor(Math.random() * 10 + 5)).fill(null).map((x, i) => <p key={`blank-body-${i}`} className="message-body" style={{ width: `${Math.floor(Math.random() * (document.body.clientWidth - (hasMembersIndex ? 670 : 430)) + 100)}px` }}></p>));

  useEffect(() =>  {
    const randomizeLengths = () => {
      if (document.body.clientWidth <= 800) return;
      console.log(document.body.clientWidth);
      setBlankBodies(blankBodies.map(body => <p key={body.key} className={body.props.className} style={{ width: `${Math.floor(Math.random() * (document.body.clientWidth - (hasMembersIndex ? 670 : 430)) + 50)}px` }}></p>));
    };
    
    window.addEventListener("resize", randomizeLengths);
    return () => window.removeEventListener("resize", randomizeLengths);
  });

  return (
    <div>
      <li className="blank message">
        <div className="profile-photo" />
        <div>
          <div className="sender-info">
            <h4 className="username" style={{ width: `${Math.floor(Math.random() * 40 + 70)}px`}}></h4>
          </div>
          {blankBodies}
        </div>
      </li>
    </div>
  );
};

export default MessagesIndex;