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

  render() {
    <div id="profile">
      <img src={this.props.currentUser.profilePhoto} alt="profile-photo" />
      <p>{this.props.currentUser.username}<span>{this.props.currentUser.tag}</span></p>
    </div>
  }
}