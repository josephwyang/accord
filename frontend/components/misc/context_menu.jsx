import React from "react";

const ContextMenu = ({ options }) => {
  return (
    <ul id="context-menu">
      {options.map(option => (
        <li className="context-menu-option" style={option.style} onClick={option.function}>
          {option.name}
        </li>
      ))}
    </ul>
  )
};

export default ContextMenu;