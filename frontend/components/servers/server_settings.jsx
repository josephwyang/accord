import React from "react";
import KickMemberModal from "./kick_member_modal";

export default class ServerSettings extends React.Component {
  constructor(props) {
    super(props);

    const { icon: iconUrl, banner: bannerUrl, ...server } = props.server

    this.state = {
      selectedNav: "Overview",
      deleteServerModalOpen: false,
      kickMember: null,
      changed: false,
      iconUrl,
      bannerUrl,
      ...server
    };
    this.handleEsc = this.handleEsc.bind(this);
    this.checkChange = this.checkChange.bind(this);
    this.handleIconFile = this.handleIconFile.bind(this);
    this.handleBannerFile = this.handleBannerFile.bind(this);
    this.toggleCommunity = this.toggleCommunity.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleEsc(e) {
    if (e.keyCode === 27) {
      if (!this.state.kickMember && !this.props.passOwner && !this.state.deleteServerModalOpen) {
        this.props.closeSettings();
      } else if (this.state.deleteServerModalOpen) this.setState({ deleteServerModalOpen: false });
    }
  }
  componentDidMount() { window.addEventListener("keydown", this.handleEsc); }
  componentWillUnmount() { window.removeEventListener("keydown", this.handleEsc); }

  openModal(modal) {
    if (this.state.changed && this.state.selectedNav !== modal) {
      $("#server-settings").addClass("settings-error landed");
      $("#server-settings").one("animationend", () => ($("#server-settings").removeClass("settings-error")));
    } else { this.setState({ selectedNav: modal }); }
  }

  checkChange() {
    const { name: nameProp, icon: iconUrlProp, description: descriptionProp, banner: bannerUrlProp, public: publicProp } = this.props.server
    const server = { nameProp, iconUrlProp, descriptionProp, bannerUrlProp, publicProp };
    for (const key of ["name", "iconUrl", "description", "bannerUrl", "public"]) {
      if (this.state[key] !== server[`${key}Prop`]) {
        this.setState({ changed: true });
        return;
      }
    }
    this.setState({ changed: false });
  }

  reset() {
    const { icon: iconUrl, banner: bannerUrl, ...server } = this.props.server

    this.setState({
      changed: false,
      bannerUrl,
      iconUrl,
      ...server
    });
  }

  handleName(e) {
    this.setState({ name: e.target.value }, this.checkChange);
  }

  handleDescription(e) {
    if (e.target.value.length <= 255) { this.setState({ description: e.target.value.replace(/[\r\n]+/gm, "") }, this.checkChange); }
    else { this.setState({ description: e.target.value.slice(0, 255).replace(/[\r\n]+/gm, "") }, this.checkChange); }
  }

  handleIconFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => this.setState({ icon: file, iconUrl: reader.result }, this.checkChange);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ icon: null, iconUrl: "" }, this.checkChange);
    }
  }

  handleBannerFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => this.setState({ banner: file, bannerUrl: reader.result }, this.checkChange);
    if (file) { reader.readAsDataURL(file); }
  }

  handleRemoveIcon() {
    this.setState({ icon: null, iconUrl: "" }, this.checkChange);
  }

  handleRemoveBanner() {
    this.setState({ banner: null, bannerUrl: "" }, this.checkChange);
  }

  toggleCommunity() {
    this.setState({ public: !this.state.public }, this.checkChange);
  }

  handleCommunity(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[id]', this.props.server.id);
    formData.append('server[public]', this.state.public);
    this.props.patchServer(formData);
    this.setState({ changed: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.closeSettings();

    const formData = new FormData();
    formData.append('server[id]', this.props.server.id);
    formData.append('server[name]', this.state.name);
    formData.append('server[description]', this.state.description);

    if (this.state.icon) { formData.append('server[icon]', this.state.icon); }
    if (this.state.banner) { formData.append('server[banner]', this.state.banner); }

    this.props.patchServer(formData);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteServer();
    this.props.history.push("/explore")
  }

  handleExit() {
    if (this.state.changed) {
      $("#server-settings").addClass("settings-error landed");
      $("#server-settings").one("animationend", () => ($("#server-settings").removeClass("settings-error")));
    } else { this.props.closeSettings(); }
  }

  closeModal() {
    this.setState({ deleteServerModalOpen: false });
  }

  render() {
    const navOptions = ["Overview", "Community", "Members"].map(
      option => (
        <li key={`server-${option}-setting`} className={this.state.selectedNav === option ? "selected" : ""}
          onClick={() => this.openModal(option)}>
          {option}
        </li>
      )
    );
    const icon = this.state.iconUrl ? <img src={this.state.iconUrl} alt="icon" /> : <p>{this.state.name.split(" ").map(word => word[0]).slice(0, 2)}</p>;
    const members = this.props.members.map(member => <li key={`member-${member.id}`} style={{ order: this.props.server.ownerId === member.id ? 1 : 2 }} >
      <img src={member.profilePhotoUrl || window.logo} alt="profile-photo" />
      <p className="ellipsis">{member.username}<span>#{member.tag}</span></p>
      {this.props.server.ownerId === member.id ?
        <img src={window.owner} alt="owner" />
        : <>
            <div onClick={() => this.props.setPassOwner(member)}>PASS OWNERSHIP</div>
            <div onClick={() => this.setState({ kickMember: member })} >KICK</div>
        </> }
    </li>)

    return (
      <div id="server-settings" className="settings">
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

        {this.state.selectedNav === "Overview" ? (
          <form id="overview-settings" className="settings-content" onSubmit={this.handleSubmit.bind(this)}>
            <div className="esc" onClick={this.handleExit.bind(this)}>
              <img src={window.xButton} alt="exit" />
              <p>ESC</p>
            </div>
            <h1>Server Overview</h1>
            <div id="update-server-icon">
              {icon}
              <label htmlFor="old-server-icon"><p>CHANGE ICON</p></label>
              <input id="old-server-icon" accept="image/*" type="file" onChange={this.handleIconFile} />
              <div><img id="camera-icon" src={window.camera} alt="camera" /></div>
            </div>
            <div id="update-server-icon-button">
              <label htmlFor="replace-server-icon">Upload Image</label>
              <input id="replace-server-icon" accept="image/*" type="file" onChange={this.handleIconFile} />
            </div>
            <div id="update-server-name">
              <label htmlFor="updated-server-name">SERVER NAME</label>
              <input id="updated-server-name" type="text" value={this.state.name} onChange={this.handleName.bind(this)} />
              <p>Your server name and description are how other people can know what your server is about.</p>
            </div>
            <div id="update-server-description">
              <label htmlFor="updated-server-description">DESCRIPTION</label>
              <textarea id="updated-server-description" cols="30" rows="5" type="text" value={this.state.description} onChange={this.handleDescription.bind(this)} />
              <p>{this.state.description.length}/255</p>
            </div>
            <div id="update-server-banner">
              <h3>BANNER</h3>
              <p>The recommended aspect ratio for a server banner is 16:9.</p>
              <label htmlFor="updated-server-banner-1">
                <img src={this.state.bannerUrl || window.defaultBanner} alt="server-banner" />
              </label>
              <input id="updated-server-banner-1" accept="image/*" type="file" onChange={this.handleBannerFile} />
              <div id="banner-options">
                <label htmlFor="updated-server-banner-2">Upload Background</label>
                <input id="updated-server-banner-2" accept="image/*" type="file" onChange={this.handleBannerFile} />
                <p id="remove-banner" onClick={this.handleRemoveBanner.bind(this)}>Remove</p>
              </div>
            </div>
            {this.state.changed ? (
              <div className="server-settings-save">
                <p>Careful—you have unsaved changes.</p>
                <div>
                  <p onClick={this.reset.bind(this)}>Reset</p>
                  <button onClick={this.handleSubmit.bind(this)}>Save Changes</button>
                </div>
              </div>
            ) : null}
          </form>) : null}

        {this.state.selectedNav === "Community" ? (
          <div id="community-settings" className="settings-content">
            <div className="esc" onClick={this.handleExit.bind(this)}>
              <img src={window.xButton} alt="exit" />
              <p>ESC</p>
            </div>
            {this.props.server.public ? (<>
              <h1>Your server is now a Community server!</h1>
              <p>Your server is currently visible on the servers explore page. Do you want to make your server private?</p>
              <button id="disable-community" disabled={this.state.changed} onClick={this.toggleCommunity}>Disable Community</button>
            </>) : (<>
              <h1>Are you building a Community?</h1>
              <p>Convert your server to a Community server to allow other users to access your server through the servers explore page!</p>
              <button id="enable-community" disabled={this.state.changed} onClick={this.toggleCommunity}>Enable Community</button>
            </>)}
            <img src={window.communityBackground} alt="community-background" />
            <img src={window.communityHome} alt="community-home" />
            {this.state.changed ? (
              <div className="server-settings-save">
                <p>Careful—you have unsaved changes.</p>
                <div>
                  <p onClick={this.reset.bind(this)}>Reset</p>
                  <button onClick={this.handleCommunity.bind(this)}>Save Changes</button>
                </div>
              </div>
            ) : null}
          </div>) : null}

        {this.state.selectedNav === "Members" ? (
          <div id="members-settings" className="settings-content">
            <div className="esc" onClick={this.handleExit.bind(this)}>
              <img src={window.xButton} alt="exit" />
              <p>ESC</p>
            </div>
            <ul>
              <h1>Members</h1>
              {members}
            </ul>
          </div>) : null}

        {this.state.deleteServerModalOpen ? (
          <div id="delete-server-modal">
            <div className="modal-screen" onClick={this.closeModal}></div>
            <div className="settings-modal">
              <div className="settings-modal-message">
                <h1>Delete '{this.state.name}'?</h1>
                <p>Are you sure you want to delete <span>{this.state.name}</span> ? This action cannot be undone.</p>
              </div>
              <div className="form-nav">
                <p onClick={this.closeModal}>Cancel</p>
                <button onClick={this.handleDelete.bind(this)}>Delete Server</button>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.kickMember ?
          <KickMemberModal member={this.state.kickMember} serverId={this.props.server.id}
            deleteMembership={this.props.deleteMembership} closeModal={() => this.setState({ kickMember:null })}
          /> : null}
      </div>
    )
  }
};