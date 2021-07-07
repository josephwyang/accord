import React from "react";
import { Link } from "react-router-dom";


export default class Splash extends React.Component {
  render() {
    const splashButton = this.props.loggedIn ? (
      <button id="splash-button" onClick={this.props.logOut.bind(this)}>Log Out</button>
    ) : (
      <Link id="splash-button" to="/login">Log In</Link>
    );
    
    return (
      <div id="splash">
        <img id="clouds" src={window.clouds} alt="clouds" />
        <img className="toon-left" src={window.toonLeft} alt="toon-left" />
        <img className="toon-right" src={window.toonRight} alt="toon-right" />

        <nav id="nav-links">
          <a href="https://github.com/josephwyang">
            <img id="github" src={window.github} alt="github" />
          </a>
          <a href="https://www.linkedin.com/in/josephwyang/">
            <img id="linkedin" src={window.linkedin} alt="linkedin" />
          </a>
        </nav>

        {splashButton}
        <h1>EXPLORE ACCORD</h1>
        <p>where you belong to a community</p>
      </div>
    )
  }
};