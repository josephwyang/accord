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
    let li = e.target;
    while (li.tagName !== "LI") li = li.parentElement;
    this.setState({ selected: member, top: li.getBoundingClientRect().y })
  }

  render() {
    const members = this.props.members.map(member => <li key={`member-${member.id}`} style={{ order: this.props.ownerId === member.id ? 1 : 2 }}
      onClick={e => this.handleClick(e, member)}>
      <img src={member.profilePhotoUrl || window.logo} alt="profile-photo" />
      <p>{member.username}</p>
      {this.props.ownerId === member.id ? <img src={window.owner} alt="owner" /> : null}
    </li>)

    return (
      <>
        <ul id="members-index">
          <h3>MEMBERS</h3>
          {members}
        </ul>
        {this.state.selected ? <MemberPreview member={this.state.selected} top={this.state.top} /> : null}
      </>
    );
  }
};