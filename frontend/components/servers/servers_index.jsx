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

export default class ServersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      serverModalOpen: false,
      showBubble: false,
      y: 0,
      bubbleName: null
    };

    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    this.props.getServers();

    this.props.getDms().then(({ dms }) => {
      this.subscriptions = Object.values(dms).map(dm => App.cable.subscriptions.create({ channel: "MessagesChannel", channelId: dm.channelId },
        { received: data => {
            if (data.messageId) {
              this.props.removeMessage(data.messageId)
            } else {
              const message = JSON.parse(data);
              if (message.channelId === dms[this.props.history.location.pathname.split("/@me/")[1]].channelId) {
                this.props.receiveMessage(message);
              } else { this.props.receiveNotification(message); };
            }
          }
        }));
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

    setTimeout(() => {this.setState({ loading: false })}, 1500)
  }

  componentWillUnmount() {
    if (this.friends) this.friends.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setModal(bool) { this.setState({ serverModalOpen:bool }); }

  render() {
    const servers = this.props.servers.map(({id, name, icon}) => <ServerIndexItem key={`server-index-${id}`} id={id} name={name} icon={icon}
      getServer={this.props.getServer.bind(this, id)}
      showBubble={(y, bubbleName) => this.setState({ showBubble: true, y, bubbleName })}
      hideBubble={() => this.setState({ showBubble: false })}/>);
    const {id: previewId, name: previewName, icon: previewIcon} = this.props.preview;
    
    if (!this.props.servers.length) { return null; }
    return (
      <>
        <LoadingScreen loading={this.state.loading} />
        <ul id="servers-index" onScroll={() => this.setState({ showBubble: false })}>
          <NavLink to="/@me" id="dms" activeClassName="selected"
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.y + 24, bubbleName: "Home" })}
            onMouseLeave={() => this.setState({ showBubble: false })}>
            <img src={window.logo} alt="dms" />
          </NavLink>
          {Object.values(this.props.preview).length ?
            <ServerIndexItem key={`server-index-${previewId}`} id={previewId} name={previewName} icon={previewIcon}
              showBubble={(y, bubbleName) => this.setState({ showBubble: true, y, bubbleName })}
              hideBubble={() => this.setState({showBubble: false })} />
          : null}
          <hr id="servers-index-divider"/>
          {servers}
          <p id="add-server" className={this.state.serverModalOpen ? "selected" : ""} onClick={() => this.setModal(true)}
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.getBoundingClientRect().y + 24, bubbleName: "Create a Server" })}
            onMouseLeave={() => this.setState({ showBubble: false })} >+</p>
          <NavLink to="/explore" id="explore" activeClassName="selected"
            onMouseEnter={e => this.setState({ showBubble: true, y: e.target.y + 24, bubbleName: "Explore" })}
            onMouseLeave={() => this.setState({ showBubble: false })}>
            <img src={window.compass} alt="compass" />
          </NavLink>
        </ul>
        <ServerFormContainer open={this.state.serverModalOpen} setModal={bool => this.setModal(bool)}/>
        {this.props.location.pathname === "/explore" ?
          <ServersExploreContainer />
          : this.props.location.pathname.slice(0,4) === "/@me" ?
            <DmsIndexContainer />
            : <ServerContainer serversLoading={this.state.loading} />}
        <Bubble text={this.state.bubbleName} left="74px" y={this.state.y} large={true} show={true}
          opacity={(this.state.showBubble ? 1 : 0)} />
        <ProfileContainer />
      </>
    );
  }
};