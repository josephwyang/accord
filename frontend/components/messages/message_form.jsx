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
      keysDown: { "Enter": false, "Shift": false },
      mounted: false
    };

    this.setHeight = this.setHeight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
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

  setHeight() {
    const input = document.querySelector("#message-form > span");
    this.setState({ height: input.clientHeight });
  }

  componentDidUpdate(prevProps) {
    this.input = document.querySelector("#message-form > span");

    if (!this.props.channel && !this.props.dm) return;

    if(!this.state.mounted) {
      window.addEventListener("resize", this.setHeight);
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("keyup", this.handleKeyUp);
      this.setState({ mounted: true });
    }

    const isPreview = this.props.channel && !this.props.servers[this.props.channel.serverId];
    if ((prevProps.channel && !isPreview) || prevProps.dm) {
      if (prevProps.channelId !== this.props.channelId || this.changed) {
        this.setState({ body: "", height: 42, empty: true });
        this.input.innerText = "";
        const channelFormInput = document.querySelector("#channel-form > input");
        channelFormInput ? channelFormInput.focus() : this.input.focus();
      } else return;
    }

    if (prevProps.channelId !== this.props.channelId) {
      this.changed = true
    } else this.changed = false;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    this.setState({ body: "", height: 42, empty: true, replying: null, keysDown: { "Enter": false, "Shift": false }, mounted: false });
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
    const isPreview = this.props.channel && !this.props.servers[this.props.channel.serverId];
    return (
      <>
        <MessagesIndexContainer formHeight={this.state.height} messagesIndex={this.props.channel || this.props.dm} scrollToBottom={this.scrollToBottom}
          replying={this.state.replying} setReplying={replying => this.setState({ replying })} />
        <form id="message-form">
          {this.state.replying ? <div id="replying" style={{ "top": `calc(100% - 54px - ${this.state.height}px)` }}>
          <p>Replying to <span>{this.state.replying.username}</span></p>
          <div onClick={() => this.setState({ replying: null })}><img src={window.xButton} alt="x" /></div>
        </div> : null}
          <span role="textbox" contentEditable={!isPreview} style={isPreview ? { height: "20px", cursor: "not-allowed" } : null} onInput={this.handleInput.bind(this)}></span>
          {this.state.empty ? <div className="placeholder">{this.props.channel ? `Message #${this.props.channel.name}` : this.props.dm.user ? `Message @${this.props.dm.user.username}` : `Message ${this.props.dm.name}`}</div> : null}
        </form>
      </>
    );
  }
}