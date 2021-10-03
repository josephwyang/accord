import React from "react";
import ServerIndexItem from "./server_index_item";
import ServerFormContainer from "./server_form_container"
import { NavLink } from "react-router-dom";
import ServersExploreContainer from "./servers_explore_container";
import ServerContainer from "./server_container";

export default class ServersIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { serverModalOpen: false, loading: true };
    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    this.props.getServers();
    this.setState({ loading: false });
  }

  setModal(bool) { this.setState({ serverModalOpen:bool }); }

  render() {
    const servers = this.props.servers.map(({id, name, icon}) => <ServerIndexItem key={`server-index-${id}`} id={id} name={name} icon={icon} getServer={this.props.getServer.bind(this, id)}/>);
    const {id: previewId, name: previewName, icon: previewIcon} = this.props.preview;
    
    if (!this.props.servers.length) { return null; }
    return (
      <>
        <ul id="server-index">
          <NavLink to="/explore" activeClassName="selected"><img src={window.logo} alt="dms" /></NavLink>
          {Object.values(this.props.preview).length ?
            <ServerIndexItem key={`server-index-${previewId}`} id={previewId} name={previewName} icon={previewIcon}/>
          : null}
          <hr id="server-index-divider"/>
          {servers}
          <p id="add-server" className={this.state.serverModalOpen ? "selected" : ""} onClick={() => this.setModal(true)}>+</p>
          <NavLink to="/explore" activeClassName="selected"><img src={window.compass} alt="compass" /></NavLink>
        </ul>
        <ServerFormContainer open={this.state.serverModalOpen} setModal={bool => this.setModal(bool)}/>
        {this.props.location.pathname === "/explore" ?
          <ServersExploreContainer />
          : <ServerContainer serversLoading={this.state.loading} />}
      </>
    );
  }
};