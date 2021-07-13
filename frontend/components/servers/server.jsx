import React from "react";
import ServerSettingsContainer from "./server_settings_container"
import ChannelsIndex from "../channels/channels_index";
import ChannelFormContainer from "../channels/channel_form_container";

export default class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHeaderOpen: false,
      channelHeaderOpen: true,
      serverSettingsOpen: false,
      channelFormOpen: false
    };
  }

  componentDidMount() {
    if (jQuery.isEmptyObject({})) { this.props.getServer(); }
  }

  toggleOpen(field) {
    this.setState({ [`${field}Open`]: !this.state[`${field}Open`] })
  }

  render() {
    if (!this.props.server) { return null; }

    return (
      <div id="server">
        <ChannelsIndex toggleOpen={this.toggleOpen.bind(this)} openChannelForm={() => this.setState({ channelFormOpen: true })} openServerSettings={() => this.setState({ serverSettingsOpen: true })}
          serverHeaderOpen={this.state.serverHeaderOpen} channelHeaderOpen={this.state.channelHeaderOpen}
          server={this.props.server} channels={this.props.channels} channelId={this.props.match.params.channelId} />

        <ul id="messages"></ul>
        {this.state.serverHeaderOpen ? (
          <>
            <div className="transparent-modal-screen" onClick={() => this.setState({ serverHeaderOpen: false })}></div>
            <ul id="server-header-modal">
              <li>Invite People</li>
              {this.props.server.ownerId === this.props.currentUser.id ? (
              <li onClick={() => {this.setState({ serverSettingsOpen:true, serverHeaderOpen:false })}}>Server Settings</li>
              ) : null}
              <li onClick={() => {this.setState({ channelFormOpen:true, serverHeaderOpen:false })}}>Create Channel</li>
              <li>Change Nickname</li>
            </ul>
          </>
        ) : null }
        {this.state.channelFormOpen ? (
          <ChannelFormContainer closeForm={() => this.setState({ channelFormOpen: false })}/>
        ) : null}
        {this.state.serverSettingsOpen ? (
          <ServerSettingsContainer closeSettings={() => this.setState({ serverSettingsOpen: false })} />
        ) : null}
      </div>
    )
  }
};