// container: currentUser, patchUser(), logOut()
// parent: setModal()
// modals: username, password, email, phone number, theme, delete account

import React from "react";

export default class UserSettings extends React.Component() {
  constructor(props) {
    super(props);
    this.state = props.currentUser;
  }

  handleInput(field) {
    e => this.state.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setUserFormModal(false);

    const formData = new FormData();
    formData.append('user[email]', this.state.public);
    formData.append('user[username]', this.state.username);
    formData.append('user[phoneNumber]', this.state.phoneNumber);
    formData.append('user[password]', this.state.password);
    formData.append('user[currentPassword]', this.state.currentPassword);

    if (this.state.icon) { formData.append('user[icon]', this.state.icon); }

    this.props.postServer(formData);
  }

  render() {
    <div id="user-settings" className="settings">
      <div className="settings-nav-div">
        <ul id="server-settings-nav" className="settings-nav">
          <h3>{this.props.server.name.toUpperCase()}</h3>
          {navOptions.slice(0, 2)}
          <h3>USER MANAGEMENT</h3>
          {navOptions.slice(2)}
          <h3></h3>
          <li className="red" onClick={() => this.setState({ deleteServerModalOpen: true })}>Delete Server</li>
        </ul>
      </div>
    </div>
  }
}