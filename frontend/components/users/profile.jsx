import React from "react";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      settingsOpen: false,
      usernameModalOpen: false,
      emailModalOpen: false,
      phoneNumberModalOpen: false,
      passwordModalOpen: false,
      ...props.currentUser
    })
  }

  copyName() {
    const text = document.createElement("textarea");
    document.body.appendChild(text);
    text.value = `${this.props.currentUser.username}#${this.props.currentUser.tag}`;
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
    const copied = document.getElementById("profile-name-copied")
    copied.className="copied";
    setTimeout(() => { copied.className="" }, 2000);
  }

  render() {
    return (
    <div id="profile">
        <img className="profile-photo" src={this.props.currentUser.profilePhoto || window.logo} alt="profile-photo" />
        <div id="profile-name" onClick={this.copyName.bind(this)}>
          <p>{this.props.currentUser.username}</p>
          <p>#{this.props.currentUser.tag}</p>
      </div>
      <img id="cog" src={window.cog} alt="settings" />
      <p id="profile-name-copied">Copied!</p>
      <div className="arrow-down"></div>
    </div>
    )
  }
}