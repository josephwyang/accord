import React from "react";
import MemberPreview from "./member_preview";

export default class MembersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      top: null
    };

    this.handleOffClick = this.handleOffClick.bind(this);
  }

  componentDidMount() { window.addEventListener("click", this.handleOffClick); }
  componentWillUnmount() { window.removeEventListener("click", this.handleOffClick); }

  handleOffClick(e) {
    if (!Array.from(document.querySelectorAll("#members-index > li, #members-index > li *, #member-preview, #member-preview *")).includes(e.target)) {
      this.setState({ selected: null, top: null });
    }
  }

  handleClick(e, member) {
    if (this.state.selected && member.id === this.state.selected.id) {
      this.setState({ selected: null, top: null });
      return;
    }

    let li = e.target;
    while (li.tagName !== "LI") li = li.parentElement;
    this.setState({ selected: member, top: li.getBoundingClientRect().y })
  }

  render() {
    const friendInfo = member => {
      const { friends, friendRequests, pendingFriends } = this.props;
      let friend;
      friends.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
      if (friend) return { text: "Remove Friend", color: "red", function: () => this.props.setDeleteFriend(friend)};

      pendingFriends.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
      if (friend) return { text: "Cancel Friend Request", color: "red", function: () => this.props.deleteFriendFunc(friend.friendshipId)};

      friendRequests.forEach(checkedFriend => checkedFriend.id == member.id ? friend = checkedFriend : null);
      if (friend) return { text: "Accept Friend Request", color: "blue", function: () => this.props.acceptFriendship(friend.friendshipId)};

      return { text: "Add Friend", color: "blue", function: () => this.props.requestFriendship({ username: member.username, tag: member.tag })};
    };

    const contextOptions = member => [
      { text: "Pass Ownership", function: () => this.props.setPassOwner(member) },
      { text: "BREAK" },
      friendInfo(member),
      { text: "Message", function: () => this.props.createDm(member.id) }
    ];

    const members = this.props.members.map(member => <li key={`member-${member.id}`} style={{ order: this.props.ownerId === member.id ? 1 : 2 }}
      onClick={e => this.handleClick(e, member)} onContextMenu={e => {
        if (this.props.currentUserId !== member.id) {
          this.props.setContext(e, !this.props.gc && this.props.ownerId === this.props.currentUserId ? contextOptions(member) : contextOptions(member).slice(2))
        };
      }} >
      <img src={member.profilePhotoUrl || window.logo} alt="profile-photo" />
      <p className="ellipsis">{member.username}</p>
      {this.props.ownerId === member.id ? <img src={window.owner} alt="owner" /> : null}
    </li>)

    return (
      <>
        <ul id="members-index" className={this.props.gc ? "gc-members" : "server-members"} >
          <h3>MEMBERS</h3>
          {this.props.showBlanks ? null : members}
        </ul>

        {this.state.selected ? <MemberPreview member={this.state.selected} top={this.state.top} createDm={this.props.createDm} postMessage={this.props.postMessage} currentUserId={this.props.currentUserId} /> : null}
      </>
    );
  }
};