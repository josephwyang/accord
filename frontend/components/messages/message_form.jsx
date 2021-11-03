import React from "react";
import MessagesIndexContainer from "./messages_index_container";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "", height: 42, empty: true, justEdited: false };
  }

  componentDidUpdate(prevProps) {
    this.input = document.querySelector("#message-form > span");

    if (!this.props.channel && !this.props.dm) return;
    if (prevProps.channel || prevProps.dm) {
      if (prevProps.channelId !== this.props.channelId) {
        this.setState({ body: "", height: 42, empty: true });
        this.input.innerText = "";
      } else return;
    }

    window.addEventListener("resize", () => this.setState({ height: this.input.clientHeight }));
    this.input.focus();
  }

  componentWillUnmount() { window.removeEventListener("resize", () => this.setState({ height: this.input.clientHeight })); }

  handleInput(e) {
    if (e.target.innerText.endsWith("\n")) {
      e.target.innerText = "";
      this.setState({ empty: true })
      this.handleSubmit(e);
    } else {
      this.setState({ body: e.target.textContent, height: e.target.clientHeight, empty: false });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { channelId, currentUserId, postMessage } = this.props;

    postMessage({
      channelId,
      senderId: currentUserId,
      body: this.state.body
    }).then(() => {
      this.setState({ body: "" });
      this.scrollToBottom();
    });
  }

  scrollToBottom() { document.getElementById("messages-end").scrollIntoView({ behavior: "instant" }) }

  render() {
    if(!this.props.channel && !this.props.dm) { return null; }

    return (
      <>
        <MessagesIndexContainer formHeight={this.state.height} messagesIndex={this.props.channel || this.props.dm} scrollToBottom={this.scrollToBottom} loading={this.props.loading} />
        <form id="message-form">
          <span role="textbox" contentEditable onInput={this.handleInput.bind(this)} autoFocus></span>
          {this.state.empty ? <div className="placeholder">{this.props.channel ? `Message #${this.props.channel.name}` : this.props.dm.user ? `Message @${this.props.dm.user.username}` : `Message ${this.props.dm.name}`}</div> : null}
        </form>
      </>
    );
  }
}