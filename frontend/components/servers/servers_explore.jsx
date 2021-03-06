import React from "react";
import { firstChannelId } from "../../reducers/channels_selector";

export default class ServersExplore extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      genre: "",
      search: ""
    });
  }

  componentDidMount() {
    document.querySelector("#servers-explore > input").focus();
  }

  getServer(server) {
    if (Object.keys(this.props.servers).some(serverId => serverId == server.id)) {
      return this.props.getServer(server.id);
    } else { return this.props.previewServer(server.id); }
  }

  handleClick(e, server) {
    this.getServer(server).then(({ payload }) => { this.props.history.push(`/channels/${server.id}/${firstChannelId(payload.channels)}`) })
  }
  
  render() {
    const toWords = str => {
      const words = str.replace(/([A-Z])/g, " $1").replace("And", "&");
      return words[0].toUpperCase() + words.slice(1);
    };
    const toKebab = str => str.replace(/([A-Z])/g, "-$1").toLowerCase();

    const genreTypes = ["gaming", "music", "education", "scienceAndTech", "entertainment"];
    const genres = genreTypes.map(genre => (
      <li key={`explore-${toKebab(genre)}`} onClick={() => {
        if (this.state.genre !== genre) {
          this.setState({ genre });
          document.querySelector("#servers-explore > img:first-child").scrollIntoView({ behavior: "instant" });
        }
      }} className={this.state.genre === genre ? "selected" : ""}>
        <img src={window[`${genre}Icon`]} alt={toWords(genre).toLowerCase()} />
        {toWords(genre)}
      </li>
    ));
    
    const servers = this.props.serversWithGenre(this.state.genre).map(
      server => {
        if (server.name.toLowerCase().includes(this.state.search.toLowerCase())) {
          return (
            <li key={`server-${server.id}`} onClick={e => this.handleClick(e, server)}>
              <div className="server-banner"><img src={server.banner || window.defaultBanner} alt="server-banner" /></div>
              {server.icon ? <img className="server-icon" src={server.icon} alt="server-icon" /> : <p className="server-icon" style={{ backgroundColor: "#393C43"}}>{server.name.split(" ").map(word => word[0]).slice(0, 2)}</p>}
              <h3>{server.name}</h3>
              <p id="server-description">{server.description || `${server.name} server`}</p>
            </li>
          )
        }
      });

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
          <input type="text" placeholder="Explore communities" onChange={e => this.setState({ search: e.target.value })} />
          <img src={window.search} alt="search" />
          <ul id="public-servers">
            <h3>{this.state.genre === "" ? "Featured Communities" : "Popular Communities"}</h3>
            {servers.some(server => server) ? servers :
            <div id="no-servers">
              <img src={window.onlineWumpus} alt="no-servers" />
              <p>Failed to find servers. Try modifying your search.</p>
            </div>}
          </ul>
        </div>
      </>
    )
  }
}