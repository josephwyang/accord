import React from "react";

export default class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: props.editing ? props.editing.name : "" };
  }

  componentDidMount() { window.addEventListener("keydown", e => { if (e.key === "Escape") this.props.closeForm(); }) }
  componentWillUnmount() { window.addEventListener("keydown", e => { if (e.key === "Escape") this.props.closeForm(); }) }

  handleChange(e) {
    const filteredName = e.target.value.replace(/[^\w\-\~\s]/g, '').replace(/[\~\s]/g, "-");
    if ((filteredName[0] !== "-" && filteredName[0] !== "_")
      && ((filteredName.slice(-1) !== "-" && filteredName.slice(-1) !== "_")
      || (this.state.name.slice(-1) !== "-" && this.state.name.slice(-1) !== "_"))) {
      this.setState({ name: filteredName });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = ( this.state.name.slice(-1) === "-" || this.state.name.slice(-1) === "_" ) ? this.state.name.slice(0, -1) : this.state.name;
    if(name === "") return;
    this.props.closeForm();
    if (this.props.editing) {
      this.props.patchChannel({ id: this.props.editing.id, name });
    } else this.props.postChannel({ name, serverId: this.props.match.params.serverId });
  }

  render() {
    return (
      <div id="channel-form-modal">
        <div className="modal-screen" onClick={this.props.closeForm}></div>
        <form id="channel-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="exit" onClick={this.props.closeForm}>✕</div>
          <h1>{this.props.editing ? `Rename '${this.props.editing.name}'` : "Create Text Channel"}</h1>
          <h2>Post images, GIFs, stickers, opinions and puns.</h2>
          <label htmlFor="channel-name">CHANNEL NAME</label>
          <input id="channel-name" type="text" placeholder="new-channel"
            value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus />
          <img src={window.hashtag} alt="#" />
          <div>
            <p onClick={this.props.closeForm}>Cancel</p>
            <button onClick={this.handleSubmit.bind(this)}>{this.props.editing ? "Rename" : "Create"} Channel</button>
          </div>
        </form>
      </div>
    );
  }
}