import React from "react";
import { Link } from "react-router-dom";
import clouds from "../../../app/assets/images/clouds.svg"
import toonLeft from "../../../app/assets/images/toon-left.svg"
import toonRight from "../../../app/assets/images/toon-right.svg"
import linkedin from "../../../app/assets/images/linkedin.png"
import github from "../../../app/assets/images/github.svg"


export default class Splash extends React.Component {
  render() {
    debugger
    const splashButton = this.props.loggedIn ? (
      <button id="splash-button" onClick={this.props.logOut.bind(this)}>Log Out</button>
    ) : (
      <Link id="splash-button" to="/login">Log In</Link>
    );
    return (
      <div id="splash">
        <img id="clouds" src={clouds} alt="clouds" />
        <img id="toon-left" src={toonLeft} alt="toonLeft" />
        <img id="toon-right" src={toonRight} alt="toonRight" />

        <nav id="nav-links">
          <a href="https://github.com/josephwyang">
            <img id="github" src={github} alt="github" />
          </a>
          <a href="https://www.linkedin.com/in/josephwyang/">
            <img id="linkedin" src={linkedin} alt="linkedin" />
          </a>
        </nav>

        {splashButton}
        <h1>EXPLORE ACCORD</h1>
        <p>where you belong to a community</p>
      </div>
    )
  }
};