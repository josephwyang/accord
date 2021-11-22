import React from "react";
import { Link } from "react-router-dom";


export default class Splash extends React.Component {

  handleScroll(scrollY) {
    if (scrollY > 900 - window.innerHeight) {
      $("#splash-info-1").addClass("show-content");
    }

    if (scrollY > 1600 - window.innerHeight) {
      $("#splash-info-2").addClass("show-content");
    }

    if (scrollY > 2300 - window.innerHeight) { $("#splash-info-3").addClass("show-content"); }
    
    if (scrollY > 626) {
      $("#splash").addClass("scrolled-down");
      $("#scroll-to-top").addClass("scroll-to-top");
    } else {
      $("#splash").removeClass("scrolled-down");
      $("#scroll-to-top").removeClass("scroll-to-top");
    }
  }

  componentDidMount() { document.addEventListener("scroll", () => window.requestAnimationFrame(() => this.handleScroll(window.scrollY))); }
  componentWillUnmount() { document.removeEventListener("scroll", () => window.requestAnimationFrame(() => this.handleScroll(window.scrollY))); }

  render() {
    const splashButton = (header) => this.props.loggedIn ? (
      <Link id="splash-button" to="/explore">Open Accord</Link>
    ) : (
        header ? <Link id="splash-button" to="/login">Log In</Link> : <Link id="splash-button" to="/signup">Sign Up</Link>
    );

    return (
      <div id="splash">
        <div id="splash-banner">
          <img id="clouds" src={window.clouds} alt="clouds" />
          <img id="toon-left" src={window.toonLeft} alt="toon-left" />
          <img id="toon-right" src={window.toonRight} alt="toon-right" />
          <div id="splash-header">
            <Link id="home-button" to="/">
              <img id="logo" src={window.logo} alt="logo" />
              <img id="accord" src={window.accord} alt="accord" />
            </Link>
            <nav id="nav-links">
              <a href="https://github.com/josephwyang/accord" target="_blank">
                <img id="github" src={window.github} alt="github" />
              </a>
              <a href="https://www.linkedin.com/in/josephwyang/" target="_blank">
                <img id="linkedin" src={window.linkedin} alt="linkedin" />
              </a>
            </nav>
            {splashButton(true)}
          </div>
          <h1>EXPLORE ACCORD</h1>
          <p>where you belong to a community</p>
        </div>
        <div id="splash-content">
          <div id="splash-background-1">
            <div id="splash-info-1">
              <img id="splash-image-1" src={window.splashImage1} alt="splash-image-1" />
              <div>
                <h2>Join Accord today</h2>
                <p>Accord is a clone of the Discord instant messaging, supporting real-time chat and many other features.</p>
              </div>
            </div>
          </div>
          <div id="splash-background-2">
            <div id="splash-info-2">
              <img id="splash-image-2" src={window.splashImage2} alt="splash-image-2" />
              <div>
                <h2>Find servers, meet people, join communities</h2>
                <p>With a Servers Explore feature, all public servers are visible and free to join.</p>
              </div>
            </div>
          </div>
          <div id="splash-background-3">
            <div id="splash-info-3">
              <img id="splash-image-3" src={window.splashImage3} alt="splash-image-3" />
              <div>
                <h2>Message friends directly</h2>
                <p>With direct messaging, send texts to friends privately or even in a group message.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="scroll-to-top" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          SCROLL TO TOP
        </div>
        <div id="footer">
          <h1>EXPLORE ACCORD</h1>
          <p>where you belong to a community</p>
          <nav id="footer-links">
            <a href="https://github.com/josephwyang/accord" target="_blank">
              <p>GITHUB</p>
              <img id="github" src={window.github} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/josephwyang/" target="_blank">
              <p>LINKEDIN</p>
              <img id="linkedin" src={window.linkedin} alt="linkedin" />
            </a>
          </nav>
          <p>Disclaimer: For the purposes of creating an accurate clone, some images used in the making of Accord were taken directly from the official Discord website. All credits belong to Discord.</p>
          <hr />
          <div>
            <div>
              <img src={window.logo} alt="logo" />
              <img src={window.accord} alt="accord" />
            </div>
            {splashButton()}
          </div>
        </div>
      </div>
    )
  }
};