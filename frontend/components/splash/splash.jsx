import React from "react";
import { Link } from "react-router-dom";

export default class Splash extends React.Component {
  render() {
    const splashButton = this.props.loggedIn ? (
        <button className="btn" onClick={this.props.logOut.bind(this)}>Log Out</button>
      ) : (
        <Link to="/login" className="btn">Log In</Link>
      );
    return (
      <div id="splash">
        <img className="background" />
        {splashButton}
      </div>
    )
  }
}