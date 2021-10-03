import React from "react";

const MessageSettings = props => {
  return (
    <div id="message-settings">
      <img src={window.reaction} alt="reaction" />
      <img src={window.edit} alt="edit" />
      <img src={window.xButton} alt="X" />
    </div>
  );
};

export default MessageSettings;