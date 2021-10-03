import React from "react";

export default class MembersIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const members = this.props.members.map(member => <li key={`member-${member.id}`} style={{ order: this.props.ownerId === member.id ? 1 : 2 }} >
      <img src={member.profilePhotoUrl || window.logo} alt="profile-photo" />
      <p>{member.username}</p>
      {this.props.ownerId === member.id ?
        <img src={window.owner} alt="owner" />
        : null}
    </li>)

    return (
      <ul id="members-index">
        <h3>MEMBERS</h3>
        {members}
      </ul>
    );
  }
};