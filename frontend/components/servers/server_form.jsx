import React from "react";

export default class ServerForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.nullState = {
      name: `${props.currentUser.username}'s server`,
      public: null,
      genre: "",
      icon: null,
      iconUrl: "",
      firstModalOpen: true,
      secondModalOpen: false,
      thirdModalOpen: false
    };

    this.state = this.nullState;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => this.setState({ icon: file, iconUrl: reader.result });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ icon: null, iconUrl: "" });
    }
  }

  openModal(num) {
    const modals = ["firstModalOpen", "secondModalOpen", "thirdModalOpen"];
    const modalToOpen = modals[num-1];

    for (const modal of modals) {
      if (modalToOpen !== modal) {this.setState({ [modal]:false })};
    }

    this.setState({ [modalToOpen]:true });
  }

  closeModal() {
    this.setState(this.nullState);
    this.props.setModal(false);
  }

  handleFirstClick(genre) {
    this.setState({ genre });
    this.openModal(2);
  }

  handleSecondClick(bool) {
    this.setState({ public: bool })
    this.openModal(3);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(this.nullState);
    this.props.setModal(false);

    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    formData.append('server[public]', this.state.public);
    formData.append('server[genre]', this.state.genre);
    formData.append('server[ownerId]', this.props.currentUser.id);

    if (this.state.icon) { formData.append('server[icon]', this.state.icon); }

    this.props.postServer(formData);
  }

  render() {
    if (!this.props.open) { return null; }

    const toWords = str => {
      const words = str.replace(/([A-Z])/g, " $1").replace("And", "&");
      return words[0].toUpperCase() + words.slice(1);
    };
    const toKebab = str => str.replace(/([A-Z])/g, "-$1").toLowerCase();

    const genreTypes = ["createMyOwn", "gaming", "music", "education", "scienceAndTech", "entertainment"];
    const genres = genreTypes.map(genre => (
      <li key={toKebab(genre)} onClick={this.handleFirstClick.bind(this, genre)}>
        <div>
          <img src={window[genre]} alt={toWords(genre).toLowerCase()} />
          {toWords(genre)}
        </div>
        <img src={window.arrow} alt="arrow" />
      </li>
    ));

    const restrictions = (
      <>
        <li onClick={() => this.handleSecondClick(false)}>
          <div>
            <img src={window.door} alt="private server" />
            For me and my friends
          </div>
          <img src={window.arrow} alt="arrow" />
        </li>
        <li onClick={() => this.handleSecondClick(true)}>
          <div>
            <img src={window.entertainment} alt="public server" />
            For a club of community
          </div>
          <img src={window.arrow} alt="arrow" />
        </li>
      </>
    );

    const uploadIcon = this.state.iconUrl ? (
      <img id="uploaded-server-icon" src={this.state.iconUrl} alt="uploaded-server-icon" />
    ) : (
      <>
        <img id="camera-icon" src={window.camera} alt="camera" />
        <p>UPLOAD</p>
        <p id="upload-plus">+</p>
      </>
    );

    return (
      <div id="server-form-modal">
        <div className="modal-screen" onClick={this.closeModal}></div>
        
        {this.state.firstModalOpen ? (
        <div id="genre-form">
          <div className="exit" onClick={this.closeModal}>✕</div>
          <h1>Create a server</h1>
          <h2>A server is where you and your community can interact.</h2>
          <ul id="genre-options">
            {genres[0]}
            <p>START FROM A TEMPLATE</p>
            {genres.slice(1)}
          </ul>

          <div className="form-nav">
            <h3>Have an invite already?</h3>
            <button id="join-server">Join a Server</button>
          </div>
        </div>) : null}

        {this.state.secondModalOpen ? (
        <div id="public-form">
          <div className="exit" onClick={this.closeModal}>✕</div>
          <h1>Tell us more about your server</h1>
          <h2>Is your server just for a few friends or a larger community?</h2>
          <ul id="public-options">
            {restrictions}
          </ul>

          <div className="form-nav">
            <p className="back-button" onClick={() => this.openModal(1)}>Back</p>
          </div>
        </div>) : null}

        {this.state.thirdModalOpen ? (
        <form id="server-form">
          <div className="exit" onClick={this.closeModal}>✕</div>
          <h1>Customize your server</h1>
          <h2>Give your server a name and an icon. You can always change it later.</h2>
          <label htmlFor="file-button" id="upload-button">{uploadIcon}</label>
          <input id="file-button" type="file" onChange={this.handleFile.bind(this)} />

          <label id="server-name" htmlFor="server-name-input">SERVER NAME</label>
            <input id="server-name-input" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />

          <div className="form-nav">
            <p className="back-button" onClick={() => this.openModal(2)}>Back</p>
            <button id="form-button" onClick={this.handleSubmit.bind(this)}>Create</button>
          </div>
        </form>) : null}
      </div>
    );
  }
};