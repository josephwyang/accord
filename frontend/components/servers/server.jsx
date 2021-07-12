import React from "react";
import ChannelsIndex from "../channels/channels_index";
import ChannelFormContainer from "../channels/channel_form_container";

export default class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHeaderOpen: false,
      channelHeaderOpen: true,
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
        <ChannelsIndex toggleOpen={this.toggleOpen.bind(this)} openChannelForm={() => this.setState({ channelFormOpen: true })}
          serverHeaderOpen={this.state.serverHeaderOpen} channelHeaderOpen={this.state.channelHeaderOpen}
          server={this.props.server} channels={this.props.channels} channelId={this.props.match.params.channelId} />

        <ul id="messages"></ul>
        {this.state.serverHeaderOpen ? (
          <>
            <div className="transparent-modal-screen" onClick={() => this.setState({ serverHeaderOpen: false })}></div>
            <ul id="server-header-modal">
              <li>Invite People</li>
              <li>Server Settings</li>
              <li onClick={() => {this.setState({ channelFormOpen:true, serverHeaderOpen:false })}}>Create Channel</li>
              <li>Change Nickname</li>
            </ul>
          </>
        ) : null }
        {this.state.channelFormOpen ? (
          <ChannelFormContainer closeForm={() => this.setState({ channelFormOpen: false })}/>
        ) : null}
      </div>
    )
  }
};