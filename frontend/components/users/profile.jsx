import React from "react";
import UserSettingsContainer from "./user_settings_container";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      settingsOpen: true,
      usernameModalOpen: false,
      emailModalOpen: false,
      phoneNumberModalOpen: false,
      passwordModalOpen: false,
      ...props.currentUser
    })
  }

  copyName() {
    const tag = `${this.props.currentUser.username}#${this.props.currentUser.tag}`;
    navigator.clipboard.writeText(tag).then(() => {
      const copied = document.getElementById("profile-name-copied")
      copied.className="copied";
      setTimeout(() => { copied.className="" }, 2000);
    })
  }

  render() {
    return (
    <>
      <div id="profile">
          <img className="profile-photo" src={this.props.currentUser.profilePhoto || window.logo} alt="profile-photo" />
          <div id="profile-name" onClick={this.copyName.bind(this)}>
            <p>{this.props.currentUser.username}</p>
            <p>#{this.props.currentUser.tag}</p>
        </div>
        <img id="cog" src={window.cog} alt="settings" onClick={ () => this.setState({settingsOpen: true}) }/>
        <div id="user-settings-bubble">
          <p>User Settings</p>
          <div className="arrow-down"></div>
        </div>
        <div id="profile-name-copied">
          <p>Copied!</p>
          <div className="arrow-down"></div>
        </div>
      </div>
      {this.state.settingsOpen ? <UserSettingsContainer closeSettings={ () => this.setState({settingsOpen: false}) }/> : null}
    </>
    )
  }
}