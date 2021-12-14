import React from "react";
import MessageFormContainer from "../messages/message_form_container"

export default class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { messages: this.props.messages };
  }

  loadChannel() {
    this.props.getChannel().then(({ payload }) => {
      this.channel = App.cable.subscriptions.create({ channel: "MessagesChannel", channelId: payload.channel.id },
        { received: data => {
          if (data.reactionId && data.channelId === this.props.currentChannel) {
            this.props.removeReaction(data);
          } else if (data.messageId && data.channelId === this.props.currentChannel) {
            this.props.removeMessage(data.messageId);
          } else {
            const parsedData = JSON.parse(data);
            if (parsedData.reactorId && parsedData.channelId === this.props.currentChannel) {
              this.props.receiveReaction(parsedData);
            } else if (parsedData.channelId === this.props.currentChannel) {
              this.props.receiveMessage(parsedData);
              const bottom = document.getElementById("messages-end");
              if (bottom) bottom.scrollIntoView({ behavior: "instant" });
            } else if (parsedData.senderId !== this.props.currentUserId) {
              this.props.receiveNotification(parsedData);
              setTimeout(() => this.props.removeNotification(), 5000);
            };
          }
        }
      });
    }).then(() => {
      this.props.setShowBlanks(false);
      document.getElementById("messages-end").scrollIntoView({ behavior: "instant" });
    });
  }

  componentDidMount() { this.loadChannel(); }

  componentDidUpdate(prevProps) { if(prevProps.match.params.channelId != this.props.match.params.channelId) this.loadChannel() }

  componentWillUnmount() { if(this.channel) this.channel.unsubscribe(); }

  render() {
    return (
      <div id="channel">
        <MessageFormContainer showBlanks={this.props.showBlanks} setShowBlanks={this.props.setShowBlanks} />
      </div>
    );
  }
};