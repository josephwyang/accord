import React from "react";

export default class UsersNav extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users.map(user => <li key={user.username}>{user.username}</li>);

    return (
      <div id="users-nav">
        {users}
      </div>
    )
  }
};