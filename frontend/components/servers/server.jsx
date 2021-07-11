import React from "react";

export default class Server extends React.Component {
  componentDidMount() {
    this.props.getServer();
  }

  render() {
    return (
      <></>
    )
  }
}