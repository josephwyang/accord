// modals: theme, delete account

import React, { useEffect } from "react";

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNav: "My Account",
      editModal: null,
      deleteModal: null,
      phoneNumberModal: null,
      revealEmail: false,
      revealPhoneNumber: false,
      verificationInput: "",
      confirmPassword: "",
      user: {
        ...props.currentUser,
        phoneNumber: "",
        password: "",
        currentPassword: ""
      }
    };
    this.handleEsc = this.handleEsc.bind(this);
    this.handleVerificationInput = this.handleVerificationInput.bind(this);
    this.handleInputKey = this.handleInputKey.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleEsc(e) { if (e.keyCode === 27) { this.props.closeSettings(); } }
  componentDidMount() { document.addEventListener("keydown", this.handleEsc); }
  componentWillUnmount() { document.removeEventListener("keydown", this.handleEsc); }

  toggleReveal(type) {
    const capType = `${type.slice(0, 1).toUpperCase() + type.slice(1)}`;
    this.setState({ ["reveal" + capType]: !this.state["reveal" + capType] })
  }

  openEditModal(type) {
    this.setState({
      editModal: type,
      user: {
        ...this.props.currentUser,
        phoneNumber: "",
        password: "",
        currentPassword: ""
      }
    });
  }
  closeEditModal() { this.setState({ editModal: null }); }
  closeDeleteModal() { this.setState({ deleteModal: null }); }

  displayPhoneNumber(number) {
    if (number.length >= 4) { number = `(${number.slice(0, 3)}) ${number.slice(3)}` };
    if (number.length >= 10) { number = `${number.slice(0, 9)}-${number.slice(9)}` };
    return number;
  }

  handlePhoneNumber(e) {
    let number = e.target.value.split("").map(char => {
      if (!["(", ")", "-", ".", " "].includes(char)) return char
    }).join("");

    if ((/^\d+$/.test(number) || number === "") && number.length < 11) {
      if(this.state.user.phoneNumber.length > number.length) {
        this.setState({ user: { ...this.state.user, phoneNumber: number }});
      } else {
        this.setState({ user: { ...this.state.user, phoneNumber: number }});
      };
    }
  }

  verifyPhoneNumber(e) {
    e.preventDefault();
    if(this.state.user.phoneNumber.length === 10) {
      this.props.verifyPhoneNumber("+1" + this.state.user.phoneNumber)
      this.setState({ phoneNumberModal: 2 });
    };
  }

  prevInput(currentInput) {
    document.getElementById(`verification-input-${currentInput}`).disabled = true;
    document.getElementById(`verification-input-${currentInput - 1}`).disabled = false;
    document.getElementById(`verification-input-${currentInput - 1}`).focus();
  }

  nextInput(currentInput) {
    document.getElementById(`verification-input-${currentInput}`).disabled = true;
    document.getElementById(`verification-input-${currentInput + 1}`).disabled = false;
    document.getElementById(`verification-input-${currentInput + 1}`).focus();
  }

  handleVerificationInput(e) {
    const digit = e.target.value;
    const length = this.state.verificationInput.length;

    if (digit === "" && length > 0) {
      this.setState({ verificationInput: this.state.verificationInput.slice(0, -1) });
      if (length < 6) this.prevInput(length + 1);
    }

    if (/^\d+$/.test(digit) && length < 6) {
      this.setState({ verificationInput: this.state.verificationInput + digit });
      if (length < 5) { this.nextInput(length + 1) }
      else if (this.state.verificationInput + digit === this.props.verificationCode) { this.handleSave() };
    }
  }

  handleInputKey(e) {
    const length = this.state.verificationInput.length;
    if((e.keyCode === 8 || e.keyCode === 46) && length > 0 && length < 6) {
      this.setState({ verificationInput: this.state.verificationInput.slice(0, -1) });
      this.prevInput(length + 1)
    }
  }

  focusVerificationInput() {
    for (const input of document.getElementsByClassName("verification-input")[0].children) {
      if (!input.disabled) { input.focus(); return; }
    }
  }

  handleSave(e) {
    if (e) e.preventDefault();
    const formData = new FormData();
    for (let type of ["id", "username", "email", "password", "currentPassword"]) {
      formData.append(`user[${type}]`, this.state.user[type]);
    }
    if (this.state.user.phoneNumber.length === 10) formData.append("user[phoneNumber]", `+1${this.state.user.phoneNumber}`);
    if (this.state.user.profilePhotoUrl) { formData.append('server[profilePhoto]', this.state.user.profilePhotoUrl); }
    this.props.patchUser(formData);

    this.setState({ editModal: null, phoneNumberModal: null,
      user: {
        ...this.props.currentUser,
        phoneNumber: "",
        password: "",
        currentPassword: ""
      } });
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push("/");
  }

  handleDeleteAccount(e) {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push("/");
    // delete account
  }

  render() {
    const { username, tag, profilePhotoUrl, email, phoneNumber } = this.props.currentUser;

    const navOptions = ["My Account", "User Profile", "Appearance"].map(
      option => (
        <li key={`user-${option}-setting`} className={this.state.selectedNav === option ? "selected" : ""}
          onClick={() => this.setState({ selectedNav: option })}>
          {option}
        </li>
      )
    );

    const mapToStars = word => word.split("").map(() => "*").join("");

    return (
      <div id="user-settings" className="settings">
        <div className="settings-nav-div">
          <ul id="server-settings-nav" className="settings-nav">
            <h3>USER SETTINGS</h3>
            {navOptions.slice(0, 2)}
            <h3>APP SETTINGS</h3>
            {navOptions.slice(2)}
            <h3></h3>
            <li className="red" onClick={() => this.setState({ deleteModal: "Log Out" })}>Log Out</li>
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
              <img className="profile-photo" src={profilePhotoUrl || window.logo} alt="profile-photo" />
              <p>{username}<span id="settings-tag"> #{tag}</span></p>
              <button id="edit-profile-btn" onClick={() => this.setState({ selectedNav: "User Profile" })}>Edit Profile</button>
              <div id="account-setting-options">
                <div id="username-option">
                  <h3>USERNAME</h3>
                  <p>{username}<span>#{tag}</span></p>
                  <button onClick={this.openEditModal.bind(this, "username")}>Edit</button>
                </div>

                <div id="email-option">
                  <h3>EMAIL</h3>
                  <p>{this.state.revealEmail ? email : mapToStars(email.split("@")[0]) + "@" + email.split("@")[1]}</p>
                  <p className="reveal" onClick={this.toggleReveal.bind(this, "email")}>{this.state.revealEmail ? "Hide" : "Reveal"}</p>
                  <button onClick={this.openEditModal.bind(this, "email")}>Edit</button>
                </div>

                <div id="phone-number-option">
                  <h3>PHONE NUMBER</h3>
                  {phoneNumber ?
                    <>
                      <p>{this.state.revealPhoneNumber ? phoneNumber : mapToStars(phoneNumber.slice(0, -4)) + phoneNumber.slice(-4)}</p>
                      <p className="reveal" onClick={this.toggleReveal.bind(this, "phoneNumber")}>{this.state.revealPhoneNumber ? "Hide" : "Reveal"}</p>
                      <button onClick={() => this.setState({ phoneNumberModal: 1 })}>Edit</button>
                    </>
                  :
                    <button id="add-phone-number" onClick={() => this.setState({ phoneNumberModal: 1 })}>Add Phone Number</button>
                  }
                  </div>
              </div>

            </div>
          </div>
          : null}
        
        {this.state.selectedNav === "User Profile" ?
          <div className="settings-content">
            <div className="esc" onClick={this.props.closeSettings}>
              <img src={window.xButton} alt="exit" />
              <p>ESC</p>
            </div>
            <h1>User Profile</h1>
            <label htmlFor="change-profile-photo"><img className="profile-photo" src={profilePhotoUrl || window.logo} alt="profile-photo" /></label>
            <input id="change-profile-photo" type="file" accept="image/*" />
            <div><img src={window.camera} alt="+" /></div>
            <p>{username}<span id="settings-tag">#{tag}</span></p>

            <hr />

            <h1>Password and Security</h1>
            <p>Protect your Accord account. Never share your password.</p>
            <img id="security-icon" src={window.security} alt="security" />
            <button onClick={this.openEditModal.bind(this, "password")}>Change Password</button>

            <hr />

            <h3>ACCOUNT DELETION</h3>
            <button className="red" onClick={() => this.setState({ deleteModal: "Delete Account" })}>Delete Account</button>
          </div>
          : null}

        {this.state.editModal ?
          <UserSettingsModal type={this.state.editModal} state={this.state.user}
          handleInput={(e, type) => this.setState({ user: {...this.state.user, [type]: e.target.value}})}
          handleCurrentPassword={e => this.setState({ user: {...this.state.user, currentPassword: e.target.value} })}
          closeModal={this.closeEditModal} handleSave={this.handleSave}/>
          : null}

        {this.state.phoneNumberModal ?
          <div className="user-settings-modal">
            <div className="modal-screen" onClick={() => this.setState({ phoneNumberModal: null, verificationInput: "", user: { ...this.state.user, phoneNumber: "" } })}></div>
            <form className="settings-modal">
              <img src={window.xButton} alt="X" className="modal-exit" onClick={() => this.setState({ phoneNumberModal: null, verificationInput: "", user: { ...this.state.user, phoneNumber: "" } })} />
              <div className="settings-modal-message">
                <img src={window.phone} alt="phone" />
                <h1>{this.state.phoneNumberModal === 1 ? "Enter a Phone Number" : "Enter your verification code"}</h1>
                {this.state.phoneNumberModal === 1 ? <>
                  <p>You will receive a text message with a verification code.</p>
                  <p>Your phone number can be used to verify one Accord account at a time and is only used for verification and login.</p>
                </> : <p>Enter the six digit code that was sent to the provided phone number.</p>}
              </div>
              {this.state.phoneNumberModal === 1 ?
              <>
                <p id="area-code">+1</p>
                <input id="phone-number" type="text" autoFocus onChange={this.handlePhoneNumber.bind(this)} value={this.displayPhoneNumber(this.state.user.phoneNumber)}/>
                <button className="input-btn" onClick={this.verifyPhoneNumber.bind(this)}>Next</button>
              </> : <>
                <div className="verification-input" onClick={this.focusVerificationInput}>
                  <input id="verification-input-1" autoFocus type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(0, 1)}/>
                  <input id="verification-input-2" disabled type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(1, 2)}/>
                  <input id="verification-input-3" disabled type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(2, 3)}/>
                  <input id="verification-input-4" disabled type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(3, 4)}/>
                  <input id="verification-input-5" disabled type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(4, 5)}/>
                  <input id="verification-input-6" disabled type="text" maxLength="1" onChange={this.handleVerificationInput} onKeyDown={this.handleInputKey} tabIndex="0" value={this.state.verificationInput.slice(5, 6)}/>
                </div>
                <div className="form-nav">
                  <p className="with-span">Didn't receive a message?<span onClick={this.verifyPhoneNumber.bind(this)}>Resend Code</span></p>
                </div>
              </>}
            </form>
          </div>
          : null}

        {this.state.deleteModal ?
          <div id="delete-modal">
            <div className="modal-screen" onClick={this.closeDeleteModal}></div>
            <div className="settings-modal">
              <div className="settings-modal-message">
                <h1>{this.state.deleteModal}</h1>
                <p> {this.state.deleteModal === "Log Out" ?
                  "Are you sure you want to log out?"
                  : "Are you sure you want to delete your account? This action cannot be undone."}
                </p>
              </div>
              <div className="form-nav">
                <p onClick={this.closeDeleteModal}>Cancel</p>
                <button onClick={this[`handle${this.state.deleteModal.split(" ").join("")}`].bind(this)}>{this.state.deleteModal}</button>
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
    <div className="user-settings-modal">
      <div className="modal-screen" onClick={props.closeModal}></div>
      <form className="settings-modal">
        <img src={window.xButton} alt="X" className="modal-exit" onClick={props.closeModal}/>
        <div className="settings-modal-message">
          <h1>{props.type === "email" ? "Enter an email address" : `Change your ${props.type}`}</h1>
          <p>Enter a new {props.type === "email" ? "email address" : props.type} and your existing password.</p>
        </div>
        <label className={props.type === "username" ? "username-input" : ""} htmlFor={`${props.type}`}>{props.type.toUpperCase()}</label>
        <input id={`${props.type}`} type={props.type === "password" ? "password" : "text"} value={props.state[`${props.type}`]} onChange={e => props.handleInput(e, props.type)} autoFocus />
        { props.type === "password" ?
          <>
            <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
            <input id="confirm-password" type="password" value={props.state[`${props.type}`]} onChange={e => props.handleInput(e, "confirmPassword")}/>
          </>
          : null}
        <label htmlFor="current-password">CURRENT PASSWORD</label>
        <input id="current-password" type="password" onChange={props.handleCurrentPassword}/>
        <div className="form-nav">
          <p onClick={props.closeModal}>Cancel</p>
          <button onClick={props.handleSave}>Done</button>
        </div>
      </form>
    </div>
  )
}