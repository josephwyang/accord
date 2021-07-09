import React from "react";
import Server from "./server";
import ServerFormContainer from "./server_form_container"

export default class ServerIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverModalOpen: false
    }

    this.setModal = this.setModal.bind(this)
  }

  componentDidMount() {
    this.props.getServers();
  }

  setModal(bool) {
    this.setState({ serverModalOpen:bool })
  }

  render() {
    const servers = this.props.servers.map(({id, name, photo}) => <Server key={id} id={id} name={name} photo={photo} />)
    
    return (
      <>
        <ul id="server-index">
          {servers}
          <p id="add-server" onClick={() => this.setModal(true)}>+</p>
          
        </ul>
        <ServerFormContainer open={this.state.serverModalOpen} setModal={bool => this.setModal(bool)}/>
      </>
    );
  }
};