# Accord

[Accord](https://accord-talk.herokuapp.com/), a clone of [Discord](https://www.discord.com), is an instant messaging application where users can send each other direct messages and join and create servers to build Accord communities. This application uses a Ruby on Rails backend with a React frontend.

<img width="1440" alt="splash" src="https://user-images.githubusercontent.com/81983064/142827545-3b76c7a6-abbc-4027-a81a-afab90e4573c.png">

### Versions
+ ruby 2.5.1
+ rails 5.2.6
+ node v16.4.2
+ npm 7.18.1

### Technologies and APIs
+ react/redux
+ postgresql
+ action cable
+ twilio

***

# Features

### Live Chat
This feature allows users to interact with messages real time, such as sending messages, editing them, deleting them, replying to them or reacting to them.

https://user-images.githubusercontent.com/81983064/142825057-c555509e-31d5-4722-b928-61aefe69ce83.mov

### Phone Number Verification
This feature uses the Twilio API to send text messages allowing for real phone number verification.

https://user-images.githubusercontent.com/81983064/142825058-c85f1ca4-547a-4d0c-80f3-62dc6ff3e4c2.mov

### Public Servers
This feature allows users to create public server that can be discovered and joined by other users.

https://user-images.githubusercontent.com/81983064/142825059-84bbd971-9e2d-4453-8ab6-8c367524718c.mov

### Server Invitations / Notifications
This feature allows users to invite friends to servers real time.

https://user-images.githubusercontent.com/81983064/142825060-8b991657-4dac-4b19-9c71-895430e60533.mov

### Message Settings
This feature was implemented to optimize readability of code while also allowing the component to be dynamic. This implementation takes advantage of the React-Redux framework and its single source of truth, allowing the component to access the currently logged in user.

```javascript
import React from "react";
import Bubble from "../misc/bubble";

const MessageSettings = props => {
  const handleReply = () => {
    props.reply();
    document.querySelector("#message-form > span").focus();
  }
  return (
    <div className="message-settings" style={props.style}>
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
```
<p float="left">
  <img alt="message-settings-current-user"
       src="https://user-images.githubusercontent.com/81983064/142830372-ff51a3e0-e0aa-4f82-a13d-48b850eb80b9.png"
       height="236" />
  <img alt="message-settings-other-user"
       src="https://user-images.githubusercontent.com/81983064/142830373-fb485473-1061-4c07-a31d-3efe4cfee72b.png"
       height="236" />
</p>

### Context Menu
This feature was implemented so that it can dynamically adapt to the whatever functionality is needed. The hardest part about this implentation was figuring out how to most effectively make the menu dynamic. It was done by passing in options with corresponding functions to list directly as elements in the context menu.

```javascript
// simplified for demonstration purposes
import React, { useState, useEffect, useRef } from "react";

const ContextMenu = ({ options, top, left, closeMenu }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const containerRef = useRef(null);

  // closes context menu on outside click
  useEffect(() => {
    const handleOutsideClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) closeMenu();
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  
  // positions context menu within application dimensions
  const resize = () => {
    const menuDims = document.getElementById("context-menu").getBoundingClientRect();
    setX(Math.min(Math.max(800, window.innerWidth) - menuDims.width - 10, left));
    setY(Math.min(window.innerHeight - menuDims.height - 10, top));
  };
  
  useEffect(() => resize(), [options]);
  
  // maps menu items dynamically
  const menu = options.map((option, i) => (
    <li key={`option-${i}`} className={ option.disabled ? "disabled" : option.color }
    onClick={() => {
      option.function();
      closeMenu();
    }}>{option.text}</li>
  ));

  return (
    <ul id="context-menu" ref={containerRef} style={{ top: `${y}px`, left: `${x}px` }}>
      {menu}
    </ul>
  );
};

export default ContextMenu;
```

<p float="left">
  <img alt="server-context-menu"
       src="https://user-images.githubusercontent.com/81983064/142835752-43e525be-3be7-422c-b5c6-c70e7a52bc3b.png"
       height="326" />
  <img alt="preview-context-menu"
       src="https://user-images.githubusercontent.com/81983064/142835760-32dc2a18-bece-4c1d-ab1d-b02d3a63f6ce.png"
       height="326" />
  <img alt="member-context-menu"
       src="https://user-images.githubusercontent.com/81983064/142835788-15d21ad4-142f-4adc-aae5-3a7438d72189.png"
       height="326" />
  <img alt="channel-context-menu"
       src="https://user-images.githubusercontent.com/81983064/142835773-2c082934-ae87-49d9-9d5b-d20b554cad30.png"
       height="335" />
  <img alt="dm-context-menu"
       src="https://user-images.githubusercontent.com/81983064/142835779-edb5923f-12c6-441a-98c4-47e359d08510.png"
       height="335" />
</p>

***

# Future Prospects

### Online/Offline Functionality
+ through Action Cable from Ruby on Rails

### Voice Chat
+ through the Twilio API