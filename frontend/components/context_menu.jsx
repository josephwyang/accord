import React from "react";

export default class ContextMenu extends React.component {
  constructor(props) {
    super(props);

    this.state = { focus:null };
  }

  changeFocus(focus) {
    this.setState({ focus })
  }

  render() {
    let menu;
    switch (this.state.focus) {
      case "server-index-item":
        menu = (
          <li></li>
        );
        break;
      case 2:
        menu;
        break;
      case 3:
        menu;
        break;
      case 4:
        menu;
        break;
      case 5:
        menu;
        break;
      default:
        menu = null;
        break;
    }

    return (
      <ul id="context-menu">
        {menu}
      </ul>
    );
  }
}