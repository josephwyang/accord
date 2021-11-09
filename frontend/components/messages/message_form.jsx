import React from "react";
import MessagesIndexContainer from "./messages_index_container";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      height: 42,
      empty: true,
      replying: null,
      keysDown: { "Enter": false, "Shift": false }
    };
  }

  handleKeyDown(e) {
    const input = document.querySelector("#message-form > span");
    if (e.key === "Enter" || e.key === "Shift") {
      const keysDown = this.state.keysDown;
      keysDown[e.key] = true;
      this.setState({ keysDown });
    } else if (e.key === "Escape" && document.activeElement === input) this.setState({ replying: null });
    
    if (e.key === "Enter" && input.textContent !== "" && document.activeElement === input) {
      this.handleSubmit(this.state.body);
      input.textContent = "";
    }
  }

  handleKeyUp(e) {
    if (e.key === "Enter" || e.key === "Shift") {
      const keysDown = this.state.keysDown;
      keysDown[e.key] = false;
      this.setState({ keysDown });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.setState({ height: this.input.clientHeight }));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  componentDidUpdate(prevProps) {
    this.input = document.querySelector("#message-form > span");

    if (!this.props.channel && !this.props.dm) return;
    if (prevProps.channel || prevProps.dm) {
      if (prevProps.channelId !== this.props.channelId) {
        this.setState({ body: "", height: 42, empty: true });
        this.input.innerText = "";
        this.input.focus();
      } else return;
    }
  }

  componentWillUnmount() {
    this.input = document.querySelector("#message-form > span");
    window.removeEventListener("resize", () => this.setState({ height: this.input.clientHeight }));
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    window.removeEventListener("keyup", this.handleKeyUp.bind(this));
    this.setState({ body: "", height: 42, empty: true, replying: null });
  }

  handleInput(e) {
    e.target.textContent = e.target.textContent.replace(/(\r\n|\n|\r)/gm, "");
    this.setState({ body: e.target.textContent, height: e.target.clientHeight });
    e.target.innerText === "" ? this.setState({ empty: true }) : this.setState({ empty: false });
  }

  handleSubmit() {
    const { channelId, currentUserId, postMessage } = this.props;
    const message = this.state.replying ? {
      channelId,
      senderId: currentUserId,
      body: this.state.body,
      repliedMessageId: this.state.replying.messageId
    } : {
      channelId,
      senderId: currentUserId,
      body: this.state.body
    };

    postMessage(message).then(() => {
      this.setState({ body: "", height: 42, empty: true, replying: null, keysDown: { "Enter": false, "Shift": false } });
      this.scrollToBottom();
    });
  }

  scrollToBottom() { document.getElementById("messages-end").scrollIntoView({ behavior: "instant" }) }

  render() {
    if(!this.props.channel && !this.props.dm) { return null; }

    return (
      <>
        <MessagesIndexContainer formHeight={this.state.height} messagesIndex={this.props.channel || this.props.dm} scrollToBottom={this.scrollToBottom}
          replying={this.state.replying} setReplying={replying => this.setState({ replying })} />
        <form id="message-form">
          {this.state.replying ? <div id="replying" style={{ "top": `calc(100% - 54px - ${this.state.height}px)` }}>
          <p>Replying to <span>{this.state.replying.username}</span></p>
          <div onClick={() => this.setState({ replying: null })}><img src={window.xButton} alt="x" /></div>
        </div> : null}
          <span role="textbox" contentEditable onInput={this.handleInput.bind(this)}></span>
          {this.state.empty ? <div className="placeholder">{this.props.channel ? `Message #${this.props.channel.name}` : this.props.dm.user ? `Message @${this.props.dm.user.username}` : `Message ${this.props.dm.name}`}</div> : null}
        </form>
      </>
    );
  }
}