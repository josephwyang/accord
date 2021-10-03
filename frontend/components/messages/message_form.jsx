import React from "react";
import MessagesIndexContainer from "./messages_index_container";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "", height: 42, empty: true };
  }

  componentDidUpdate(prevProps) {
    const input = document.querySelector("#message-form > span");

    if (!this.props.channel) return;
    if (prevProps.channel) {
      if (prevProps.channel.id !== this.props.channel.id) {
        this.setState({ body: "", height: 42, empty: true });
        input.innerText = "";
      } else return;
    }

    window.addEventListener("resize", () => {
      this.setState({ height: input.clientHeight });
      document.getElementById("messages-end").scrollIntoView({ behavior: "instant" });
    });
    input.focus();
  }

  handleInput(e) {
    if (e.target.innerText.endsWith("\n")) {
      e.target.innerText = "";
      this.setState({ empty: true })
      this.handleSubmit(e);
      return;
    }

    this.setState({ body: e.target.textContent, height: e.target.clientHeight, empty: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { channel, currentUserId, postMessage } = this.props;
    postMessage({
      channelId: channel.id,
      senderId: currentUserId,
      body: this.state.body
    }).then(() => this.setState({ body: "" }));
  }

  render() {
    if(!this.props.channel) { return null; }

    return (
      <>
        <MessagesIndexContainer formHeight={this.state.height} channelName={this.props.channel.name} />
        <form id="message-form">
          <span role="textbox" contentEditable
            onInput={this.handleInput.bind(this)} autoFocus>
          </span>
          {this.state.empty ? <div className="placeholder">{`Message #${this.props.channel.name}`}</div> : null}
        </form>
      </>
    );
  }
}