import React, { useEffect, useState } from "react";

const EditMessageForm = ({ message, closeEdit, setDeleting, patchMessage }) => {
  const [body, setBody] = useState(message.body);
  let input;

  useEffect(() => {
    input = document.querySelector("#edit-message-form > span");
    input.innerText = message.body;
    input.focus();
    moveCursorToEnd();

    window.addEventListener("keydown", handleKeyDown);
    return (() => window.removeEventListener("keydown", handleKeyDown));
  }, []);

  const handleKeyDown = e => {
    if (e.key === "Escape") closeEdit();
  }

  const handleInput = e => {
    if (e.target.innerText.includes("\n")) {
      saveMessage();
    } else setBody(e.target.textContent);
  }

  const saveMessage = () => {
    if (body === "") {
      closeEdit();
      setDeleting();
    } else if (body !== message.body) {
      patchMessage({
        id: message.id,
        channelId: message.channelId,
        body,
        edited: true
      });
    }
    closeEdit();
  }

  const moveCursorToEnd = () => {
    let range, selection;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(input);
      range.collapse(false);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(input);
      range.collapse(false);
      range.select();
    }
  };

  return (
    <div key={`edit-message-${message.id}`} id="edit-message-form">
      <span role="textbox" contentEditable onInput={handleInput} autoFocus></span>
      <p>esc to <span onClick={closeEdit}>cancel</span> &#8226; enter to <span onClick={saveMessage}>save</span></p>
    </div>
  )
}

export default EditMessageForm;