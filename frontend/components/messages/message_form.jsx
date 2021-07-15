import React from "react";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "" };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {channel, currentUserId, postMessage } = this.props;
    postMessage({
      channelId: channel.id,
      senderId: currentUserId,
      ...this.state
    }).then(() => this.setState({ body: "" }));
  }

  render() {
    if(!this.props.channel) { return null; }

    return (
        <form id="message-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder={`Message #${this.props.channel.name}`} value={this.state.body} onChange={e => this.setState({ body: e.target.value })} />
        </form>
    );
  }
}