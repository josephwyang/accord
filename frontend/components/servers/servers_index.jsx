import React from "react";
import Server from "./server";
import ServerFormContainer from "./server_form_container"
import { NavLink } from "react-router-dom";

export default class ServersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { serverModalOpen: false };

    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    this.props.getServers();
  }

  setModal(bool) {
    this.setState({ serverModalOpen:bool });
  }

  render() {
    const servers = this.props.servers.map(({id, name, photo}) => <Server key={id} id={id} name={name} photo={photo}/>);

    return (
      <>
        <ul id="server-index">
          {servers}
          <p id="add-server" className={this.state.serverModalOpen ? "selected" : ""} onClick={() => this.setModal(true)}>+</p>
          <NavLink to="/explore" activeClassName="selected"><img src={window.compass} alt="compass" /></NavLink>
        </ul>
        <ServerFormContainer open={this.state.serverModalOpen} setModal={bool => this.setModal(bool)}/>
      </>
    );
  }
};