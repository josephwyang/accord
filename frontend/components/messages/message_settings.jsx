import React from "react";
import Bubble from "../misc/bubble";

const MessageSettings = props => {
  const handleReply = e => {
    props.reply();
    document.querySelector("#message-form > span").focus();
    // const messageBox = e.target.parentElement.parentElement.parentElement.getBoundingClientRect();
    // const bottomY = messageBox.y + messageBox.height;
    // const distanceToMessageForm = document.getElementById("app").getBoundingClientRect().height - props.formHeight - 54 - bottomY;
    // console.log(distanceToMessageForm);
    // if (distanceToMessageForm < 10) document.getElementById("messages-index").scrollBy(0, 10 - distanceToMessageForm);

    // // doesn't scroll when last message
  }
  return (
    <>
      <div className={(props.message.senderId === props.currentUserId ? "message-settings": "message-settings other-sender")} style={props.style}>
        <div>
          <img src={window.reaction} alt="reaction" onClick={e => props.react(e)} />
          <Bubble text="Add Reaction" top="-38px" />
        </div>
        {props.message.senderId === props.currentUserId ?
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
    </>

  );
};

export default MessageSettings;