// container: patchUser()
// modals: username, password, email, phone number, theme, delete account

import React from "react";

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.currentUser, {
      selectedNav: "My Account",
      editModal: null,
      logOutModalOpen: false
    });
    this.handleEsc = this.handleEsc.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.closeLogOutModal = this.closeLogOutModal.bind(this);
  }

  handleEsc(e) { if (e.keyCode === 27) { this.props.closeSettings(); } }
  componentDidMount() { document.addEventListener("keydown", this.handleEsc); }
  componentWillUnmount() { document.removeEventListener("keydown", this.handleEsc); }

  handleInput(field) {
    e => this.state.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.closeSettings();

    const formData = new FormData();
    formData.append('user[email]', this.state.public);
    formData.append('user[username]', this.state.username);
    formData.append('user[phoneNumber]', this.state.phoneNumber);
    formData.append('user[password]', this.state.password);
    formData.append('user[currentPassword]', this.state.currentPassword);

    if (this.state.icon) { formData.append('user[icon]', this.state.icon); }

    this.props.postServer(formData);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push("/");
  }

  openEditModal(type) {
    this.setState({ editModal: type })
  }

  closeEditModal() { this.setState({ editModal: null }) }

  closeLogOutModal() {
    this.setState({ logOutModalOpen: false })
  }

  render() {
    const navOptions = ["My Account", "Password & Security", "Appearance"].map(
      option => (
        <li key={`user-${option}-setting`} className={this.state.selectedNav === option ? "selected" : ""}
          onClick={() => this.setState({ selectedNav: option })}>
          {option}
        </li>
      )
    );

    return (
      <div id="user-settings" className="settings">
        <div className="settings-nav-div">
          <ul id="server-settings-nav" className="settings-nav">
            <h3>USER SETTINGS</h3>
            {navOptions.slice(0, 2)}
            <h3>APP SETTINGS</h3>
            {navOptions.slice(2)}
            <h3></h3>
            <li className="red" onClick={() => this.setState({logOutModalOpen: true})}>Log Out</li>
          </ul>
        </div>

        {this.state.selectedNav === "My Account" ?
          <div className="settings-content">
            <div className="esc" onClick={this.props.closeSettings}>
              <img src={window.xButton} alt="exit" />
              <p>ESC</p>
            </div>
            <h1>My Account</h1>
            <div id="account-settings">
              <img className="profile-photo" src={this.props.currentUser.profilePhoto || window.logo} alt="profile-photo" />
              <p id="settings-username">{this.props.currentUser.username}<span id="settings-tag">#{this.props.currentUser.tag}</span></p>
              <div id="account-setting-options">
                <div id="username-option">
                  <h3>USERNAME</h3>
                  <p>{this.props.currentUser.username}<span>#{this.props.currentUser.tag}</span></p>
                  <button onClick={this.openEditModal.bind(this, "username")}>Edit</button>
                </div>

                <div id="email-option">
                  <h3>USERNAME</h3>
                  <p>{this.props.currentUser.username}<span>#{this.props.currentUser.tag}</span></p>
                  <p className="reveal">Reveal</p>
                  <button onClick={this.openEditModal.bind(this, "email address")}>Edit</button>
                </div>

                <div id="phone-number-option">
                  <h3>USERNAME</h3>
                  <p>{this.props.currentUser.username}<span>#{this.props.currentUser.tag}</span></p>
                  <button onClick={this.openEditModal}>Edit</button>
                </div>
              </div>

              {this.state.editModal ?
                <UserSettingsModal type={this.state.editModal} currentUser={this.props.currentUser} closeModal={this.closeEditModal} />
              : null}

            </div>
          </div>
        : null}

        {this.state.logOutModalOpen ?
          <div id="log-out-modal">
            <div className="modal-screen" onClick={this.closeLogOutModal}></div>
            <div id="log-out-form">
              <div id="log-out-message">
                <h1>Log Out</h1>
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="form-nav">
                <p onClick={this.closeLogOutModal}>Cancel</p>
                <button onClick={this.handleLogOut.bind(this)}>Log Out</button>
              </div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

const UserSettingsModal = props => {
  return (
    <>
      <div className="modal-screen" onClick={props.closeModal}></div>
      <form id="user-settings-modal">
        <h3>Change your {props.type}</h3>
        <p>Enter a new {props.type} and your existing password.</p>
        <label htmlFor={`${props.type}`}>{props.type.toUpperCase()}</label>
        <input id={`${props.type}`} type="text" value={props.currentUser.username}/>
        <label htmlFor="current-password">CURRENT PASSWORD</label>
        <input id="current-password" type="password" />
      </form>
    </>
  )
}