import React from "react";
import Bubble from "../misc/bubble";

const MessageSettings = props => {
  const handleReply = () => {
    props.reply();
    document.querySelector("#message-form > span").focus();
  }
  return (
    <div className={(props.message.senderId === props.currentUserId ? props.message.invitation ? "message-settings invitation-message-settings" : "message-settings" : "message-settings other-sender")} style={props.style}>
      <div>
        <img src={window.reaction} alt="reaction" onClick={e => props.react(e)} />
        <Bubble text="Add Reaction" top="-38px" />
      </div>
      {props.message.senderId === props.currentUserId && !props.message.invitation ?
        <div>
          <img src={window.edit} alt="edit" onClick={() => props.edit()}/>
          <Bubble text="Edit" top="-38px" />
        </div>
        : null}
      <div>
        <img src={window.reply} alt="reply" onClick={handleReply}/>
        <Bubble text="Reply" top="-38px" />
      </div>
      {props.message.senderId === props.currentUserId ?
        <div>
          <img src={window.trash} alt="delete" onClick={() => props.setDeleting()}/>
          <Bubble text="Delete" top="-38px" />
        </div>
        : null}
    </div>
  );
};

export default MessageSettings;