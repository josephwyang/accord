import React from "react";
import Bubble from "../misc/bubble";

const MessageSettings = props => {
  
  return (
    <>
      <div id="message-settings" className={(props.message.senderId === props.currentUserId ? "": "other-sender")} style={props.style}>
        <div>
          <img src={window.reaction} alt="reaction" />
          <Bubble text="Add Reaction" top="-38px" />
        </div>
        {props.message.senderId === props.currentUserId ?
          <div>
            <img src={window.edit} alt="edit" onClick={() => props.edit()}/>
            <Bubble text="Edit" top="-38px" />
          </div>
          : null}
        <div>
          <img src={window.reply} alt="reply" />
          <Bubble text="Reply" top="-38px" />
        </div>
        {props.message.senderId === props.currentUserId ?
          <div>
            <img src={window.trash} alt="delete" onClick={() => props.setDeleting()}/>
            <Bubble text="Delete" top="-38px" />
          </div>
          : null}
      </div>
    </>

  );
};

export default MessageSettings;