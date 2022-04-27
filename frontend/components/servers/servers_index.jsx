import React from "react";
import { NavLink } from "react-router-dom";
import LoadingScreen from "../misc/loading_screen";
import ServerIndexItem from "./server_index_item";
import ServerFormContainer from "./server_form_container"
import ServersExploreContainer from "./servers_explore_container";
import ServerContainer from "./server_container";
import Bubble from "../misc/bubble";
import ProfileContainer from "../users/profile_container";
import DmsIndexContainer from "../home/dms_index_container";
import Notification from "../misc/notification";
import ContextMenu from "../misc/context_menu";
import DeleteFriendModal from "../home/delete_friend_modal";

export default class ServersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingServers: true,
      loadingPublicServers: true,
      serverModalOpen: false,
      showBubble: false,
      y: 0,
      bubbleName: null,
      dm: null,
      lastPath: props.currentUser.lastPathVisited,
      showBlanks: true,

      context: null,
      contextOptions: [],

      serverInviteOpen: false,
      serverSettingsOpen: false,
      channelFormOpen: false,
      leaveServerModalOpen: false,
      deleteFriend: null
    };

    this.setModal = this.setModal.bind(this);
    this.createDm = this.createDm.bind(this);
    this.subscriptions = [];
  }

  createDmSubscription(dm) {
    this.subscriptions = [];
    this.subscriptions.push(App.cable.subscriptions.create({ channel: "MessagesChannel", channelId: dm.channelId },
      { received: data => {
        if (data.reactionId && data.channelId === this.props.currentChannel) {
          this.props.removeReaction(data);
        } else if (data.messageId && data.channelId === this.props.currentChannel) {
          this.props.removeMessage(data.messageId);
        } else {
          const parsedData = JSON.parse(data);
          if (parsedData.reactorId && parsedData.channelId === this.props.currentChannel) {
            this.props.receiveReaction(parsedData);
          } else if (parsedData.channelId === this.props.currentChannel) {
            this.props.receiveMessage(parsedData);
            const bottom = document.getElementById("messages-end");
            if (bottom) bottom.scrollIntoView({ behavior: "instant" });
          } else if (parsedData.senderId !== this.props.currentUser.id) {
            this.props.receiveNotification(parsedData);
            setTimeout(() => this.props.removeNotification(), 5000);
          };
        }
      }}
    ));
  }

  componentDidMount() {
    this.props.getServers().then(() => this.setState({ loadingServers: false }));

    this.props.getFriends();

    this.props.getDms().then(({ dms }) => {
      Object.values(dms).map(dm => this.createDmSubscription(dm));
    });

    this.friends = App.cable.subscriptions.create({ channel: "FriendshipsChannel", userId: this.props.currentUser.id, friendId: this.props.currentUser.id },
      { received: data => {
        if (data.friendshipId) {
          this.props.removeFriend(data.friendshipId)
        } else {
          const parsedData = JSON.parse(data);
          const { accepted, userId, friendId, ...friend } = parsedData;
          if (accepted) {
            this.props.receiveFriend(friend);
          } else if (userId === this.props.currentUser.id) {
            this.props.receivePendingFriend(friend);
          } else if (friendId === this.props.currentUser.id) {
            this.props.receiveFriendRequest(friend);
          }
        }
      }}
    );

    this.newDms = App.cable.subscriptions.create({ channel: "DmsChannel", currentUserId: this.props.currentUser.id },
      { received: data => {
        if (data.serverId) {
          if (this.props.history.location.pathname === `/@me/${data.serverId}`) this.props.history.push("/@me");
          this.props.removeServer(data.serverId);
        } else {
          const parsedData = JSON.parse(data);
          if (parsedData.server) {
            this.props.receiveUpdatedServer(parsedData.server);
            this.createDmSubscription(parsedData.server);
          } else this.props.receiveUpdatedServer(parsedData);
        };
      }}
    );

    this.props.getPublicServers().then(() => this.setState({ loadingPublicServers: false }));
  }

  componentDidUpdate() { 
    if (this.state.lastPath !== this.props.history.location.pathname) {
      const formData = new FormData();
      formData.append("user[id]", this.props.currentUser.id);
      formData.append("user[lastPathVisited]", this.props.history.location.pathname);
      this.props.patchUser(formData);
      this.setState({ lastPath: this.props.history.location.pathname});
    }
  }

  componentWillUnmount() {
    if (this.friends) this.friends.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  createDm(friendId, friends) {
    if (friendId) {
      for (let dm of this.props.dms) {
        if (dm.user && dm.user.id === friendId) {
          this.props.history.push(`/@me/${dm.id}`);
          this.setState({ dm });
          return dm.channelId;
        }
      }
    }

    const formData = new FormData();
    formData.append('server[name]', (friendId ? "dm" : friends.map(friend => friend.username).sort().join(", ")));
    formData.append('server[public]', false);
    formData.append('server[genre]', (friendId ? "dm" : friends.map(friend => friend.id).join(",")));
    formData.append('server[ownerId]', (friendId ? friendId : this.props.currentUser.id));

    return this.props.postServer(formData).then(payload => {
      this.props.history.push(`/@me/${payload.server.id}`);
      this.setState({ dm: payload.server });
      this.props.receiveServer(payload);
      return payload.server.channelId
    });
  };

  setModal(bool) { this.setState({ serverModalOpen:bool }); }

  render() {
    const servers = this.props.servers.map(({ id, name, icon, ownerId }) => <ServerIndexItem key={`server-index-${id}`} id={id} name={name} icon={icon} setContext={e => this.setState({ context: e, contextOptions: serverContextOptions(id, ownerId) })}
      getServer={this.props.getServer.bind(this, id)}
      showBubble={(y, bubbleName) => this.setState({ showBubble: true, y, bubbleName })}
      hideBubble={() => this.setState({ showBubble: false })}/>);
    const {id: previewId, name: previewName, icon: previewIcon} = this.props.preview;

    const serverContextOptions = (serverId, ownerId) => [
      { text: "Invite People", color: "blue", function: () => {
        if (this.props.match.params.serverId != serverId) {
          this.props.getServer(serverId).then(({ payload }) => { this.props.history.push(`/channels/${serverId}/${this.props.firstChannelId(payload.channels)}`) }).then(() => this.setState({ serverInviteOpen: true }));
        } else this.setState({ serverInviteOpen: true });
      }},
      { text: "Create Channel", function: () => {
        if (this.props.match.params.serverId != serverId) {
          this.props.getServer(serverId).then(({ payload }) => { this.props.history.push(`/channels/${serverId}/${this.props.firstChannelId(payload.channels)}`) }).then(() => this.setState({ channelFormOpen: true }));
        } else this.setState({ channelFormOpen: true });
      } },
      { text: "Open Settings", function: () => {
        if (this.props.match.params.serverId != serverId) {
          this.props.getServer(serverId).then(({ payload }) => { this.props.history.push(`/channels/${serverId}/${this.props.firstChannelId(payload.channels)}`) }).then(() => this.setState({ serverSettingsOpen: true }));
        } else this.setState({ serverSettingsOpen: true });
      }, disabled: ownerId !== this.props.currentUser.id },
      { text: "BREAK" },
      { text: "Leave Server", color: "red", function: () => {
        if (this.props.match.params.serverId != serverId) {
          this.props.getServer(serverId).then(({ payload }) => { this.props.history.push(`/channels/${serverId}/${this.props.firstChannelId(payload.channels)}`) }).then(() => this.setState({ leaveServerModalOpen: true }));
        } else this.setState({ leaveServerModalOpen: true });
      }, disabled: ownerId === this.props.currentUser.id }
    ];

    const previewContextOptions = [ {text: "Join Server", color: "blue",
      function: () => this.props.postMembership({ userId: this.props.currentUser.id, serverId: this.props.preview.id, description: "server" })}
    ];

    if (this.state.loadingServers || this.state.loadingPublicServers) return <LoadingScreen loading={this.state.loadingPublicServers && this.state.loadingServers} />;
    return (
      <>
        <ul id="servers-index" onScroll={() => this.setState({ showBubble: false })}>
          <NavLink to="/@me" id="dms" activeClassName="selected" onClick={() => {if (this.props.preview.id) this.props.removePreview()}}
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.getBoundingClientRect().y + 24, bubbleName: "Home" })}
            onMouseLeave={() => this.setState({ showBubble: false })}>
            <img src={window.logo} alt="dms" />
          </NavLink>
          {Object.values(this.props.preview).length ?
            <ServerIndexItem key={`server-index-${previewId}`} id={previewId} name={previewName} icon={previewIcon} setContext={e => this.setState({ context: e, contextOptions: previewContextOptions })}
              showBubble={(y, bubbleName) => this.setState({ showBubble: true, y, bubbleName })}
              hideBubble={() => this.setState({showBubble: false })} />
          : null}
          <hr id="servers-index-divider"/>
          {servers}
          <p id="add-server" className={this.state.serverModalOpen ? "selected" : ""} onClick={() => this.setModal(true)}
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.getBoundingClientRect().y + 24, bubbleName: "Create a Server" })}
            onMouseLeave={() => this.setState({ showBubble: false })} >+</p>
          <NavLink to="/explore" id="explore" activeClassName="selected" onClick={() => {if (this.props.preview.id) this.props.removePreview()}}
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.getBoundingClientRect().y + 24, bubbleName: "Explore" })}
            onMouseLeave={() => this.setState({ showBubble: false })}>
            <img src={window.compass} alt="compass" />
          </NavLink>
        </ul>
        <ServerFormContainer open={this.state.serverModalOpen} setModal={bool => this.setModal(bool)}/>
        {this.props.location.pathname === "/explore" ?
          <ServersExploreContainer />
          : this.props.location.pathname.slice(0,4) === "/@me" ?
            <DmsIndexContainer createDm={this.createDm} dm={this.state.dm} setDm={dm => this.setState({ dm })} subscriptions={this.subscriptions} setContext={(e, options) => this.setState({ context: e, contextOptions: options })}
              deleteFriend={this.state.deleteFriend} setDeleteFriend={friend => this.setState({ deleteFriend: friend })} showBlanks={this.state.showBlanks} setShowBlanks={bool => this.setState({ showBlanks: bool })} />
            : <ServerContainer createDm={this.createDm} serversLoading={this.state.loadingPublicServers && this.state.loadingServers} removePreview={this.props.removePreview} setContext={(e, options) => this.setState({ context: e, contextOptions: options })}
              serverInviteOpen={this.state.serverInviteOpen} setServerInviteOpen={bool => this.setState({ serverInviteOpen: bool })} serverSettingsOpen={this.state.serverSettingsOpen} setServerSettingsOpen={ bool => this.setState({serverSettingsOpen:bool })}
              channelFormOpen={this.state.channelFormOpen} setChannelFormOpen={bool => this.setState({ channelFormOpen:bool })} leaveServerModalOpen={this.state.leaveServerModalOpen} setLeaveServerModalOpen={bool => this.setState({ leaveServerModalOpen:bool })}
              deleteFriend={this.state.deleteFriend} setDeleteFriend={friend => this.setState({ deleteFriend: friend })} showBlanks={this.state.showBlanks} setShowBlanks={bool => this.setState({ showBlanks: bool })} />}
        <Bubble text={this.state.bubbleName} left="74px" y={this.state.y} large={true} show={true}
          opacity={(this.state.showBubble ? 1 : 0)} />
        <ProfileContainer />
        {this.props.notification.body ? <Notification notification={this.props.notification} removeNotification={this.props.removeNotification} history={this.props.history} /> : null}
        {this.state.context ? <ContextMenu options={this.state.contextOptions} left={this.state.context.pageX} top={this.state.context.pageY} closeMenu={() => this.setState({ context: null, contextOptions: null })} /> : null}
        {this.state.deleteFriend ? <DeleteFriendModal friend={this.state.deleteFriend} closeModal={() => this.setState({ deleteFriend: null })} /> : null}
      </>
    );
  }
};