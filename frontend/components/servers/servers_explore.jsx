import React from "react";

export default class ServersExplore extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      genre: ""
    });
  }
  render() {
    const toWords = str => {
      const words = str.replace(/([A-Z])/g, " $1").replace("And", "&");
      return words[0].toUpperCase() + words.slice(1);
    };
    const toKebab = str => str.replace(/([A-Z])/g, "-$1").toLowerCase();

    const genreTypes = ["gaming", "music", "education", "scienceAndTech", "entertainment"];
    const genres = genreTypes.map(genre => (
      <li key={`explore-${toKebab(genre)}`} onClick={() => this.setState({ genre })} className={this.state.genre === genre ? "selected" : ""}>
        <img src={window[`${genre}Icon`]} alt={toWords(genre).toLowerCase()} />
        {toWords(genre)}
      </li>
    ));
    
    const servers = this.props.serversWithGenre(this.state.genre).map(
      server => (
        <li key={`server-${server.id}`}>
          <div id="server-banner"><img src={server.banner || window.defaultBanner} alt="server-banner" /></div>
          <img id="server-icon" src={server.icon} alt="server-icon" />
          <h3>{server.name}</h3>
          <p>{server.description}</p>
        </li>
    ));

    return (
      <>
        <ul id="genre-list" className="nav">
          <h1>Discover</h1>
          <li key="home" onClick={() => this.setState({ genre: "" })} className={this.state.genre === "" ? "selected" : ""}>
            <img src={window.compass} alt="home" />Home
          </li>
          {genres}
        </ul>
        <div id="servers-explore">
          <img src={window.exploreHeader} alt="explore-header" />
          <h1>Find your community on Accord</h1>
          <h2>From gaming, to music, to learning, there's a place for you.</h2>
          <ul>{servers}</ul>
        </div>
      </>
    )
  }
}