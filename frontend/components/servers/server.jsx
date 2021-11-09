import React from "react";
import ChannelsIndex from "../channels/channels_index";
import ChannelContainer from "../channels/channel_container";
import MembersIndexContainer from "../users/members_index_container";

import ServerInviteModalContainer from "./server_invite_modal_container";
import ServerSettingsContainer from "./server_settings_container"
import ChannelFormContainer from "../channels/channel_form_container";
import LeaveServerModal from "./leave_server_modal";

export default class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverHeaderOpen: false,
      channelHeaderOpen: true,
      serverInviteOpen: false,
      serverSettingsOpen: false,
      channelFormOpen: false,
      leaveServerModalOpen: false,
      loading: true
    };
  }

  loadServer() {
    const getServer = (Object.keys(this.props.servers).includes(this.props.match.params.serverId) ? this.props.getServer : this.props.previewServer);
    getServer().then(({ payload }) => {
      const serverUrl = `/channels/${this.props.server.id}/${this.props.currentChannel ? this.props.currentChannel.id : (this.props.firstChannelId(payload.channels))}`;
      if (this.props.location.pathname !== serverUrl) this.props.history.push(serverUrl);
    });

    this.setState({ loading: false });
  }

  componentDidUpdate() { if (this.state.loading && !this.props.serversLoading) this.loadServer(); }

  toggleOpen(field) {
    this.setState({ [`${field}Open`]: !this.state[`${field}Open`] })
  }

  render() {
    if (!this.props.server) { return null; }
    return (
      <>
        <div id="server">
          <div id="channel-header">
            <img src={window.hashtag} alt="#" />
            <h3>{this.props.currentChannel ? this.props.currentChannel.name : null}</h3>
          </div>
          <ChannelsIndex toggleOpen={this.toggleOpen.bind(this)} openChannelForm={() => this.setState({ channelFormOpen: true })} openServerSettings={() => this.setState({ serverSettingsOpen: true })}
            serverHeaderOpen={this.state.serverHeaderOpen} channelHeaderOpen={this.state.channelHeaderOpen}
            server={this.props.server} channels={this.props.channels} channelId={this.props.match.params.channelId} />
          {this.state.serverHeaderOpen ? (
            <>
              <div className="transparent-modal-screen" onClick={() => this.setState({ serverHeaderOpen: false })}></div>
              <ul id="server-header-modal">
                <li onClick={() => {this.setState({ serverInviteOpen:true, serverHeaderOpen:false })}}>
                  Invite People
                  <img src={window.invite} alt="invite" />
                </li>
                {this.props.server.ownerId === this.props.currentUser.id ? (
                <li onClick={() => {this.setState({ serverSettingsOpen:true, serverHeaderOpen:false })}}>
                  Server Settings
                  <img src={window.cog} alt="cog" />
                </li>
                ) : null}
                <li onClick={() => {this.setState({ channelFormOpen:true, serverHeaderOpen:false })}}>
                  Create Channel
                  <img src={window.create} alt="create" />
                </li>
                <li onClick={() => {this.setState({ leaveServerModalOpen:true, serverHeaderOpen:false })}}>
                  Leave Server
                  <img src={window.leave} alt="leave" />
                </li>
              </ul>
            </>
          ) : null }

          {this.state.serverSettingsOpen ? (
            <ServerSettingsContainer currentUserId={this.props.currentUser.id} deleteMembership={this.props.deleteMembership} closeSettings={() => this.setState({ serverSettingsOpen: false })} />
          ) : null}
          {this.state.channelFormOpen ? (
            <ChannelFormContainer closeForm={() => this.setState({ channelFormOpen: false })}/>
          ) : null}
          <ChannelContainer />
        </div>

        {this.state.serverInviteOpen ? (
          <ServerInviteModalContainer servers={this.props.servers} server={this.props.server} closeModal={() => this.setState({ serverInviteOpen: false })} />
        ) : null}
        {this.state.leaveServerModalOpen ?
          <LeaveServerModal server={this.props.server} currentUserId={this.props.currentUser.id} isOwner={this.props.server.ownerId === this.props.currentUser.id}
            deleteMembership={this.props.deleteMembership} closeModal={() => this.setState({ leaveServerModalOpen: false })} history={this.props.history}
          /> : null}
        <MembersIndexContainer createDm={this.props.createDm} ownerId={this.props.server.ownerId} />
      </>
    )
  }
};