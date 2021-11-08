import React from "react";
import MessageFormContainer from "../messages/message_form_container"

export default class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { messages: this.props.messages, loading: true };
  }

  loadChannel() {
    this.props.getChannel().then(({ payload }) => {
      this.channel = App.cable.subscriptions.create({ channel: "MessagesChannel", channelId: payload.channel.id },
        { received: data => {
            if (data.reactionId) {
              this.props.removeReaction(data)
            } else if (data.messageId) {
              this.props.removeMessage(data.messageId)
            } else {
              const parsedData = JSON.parse(data);
              if (parsedData.reactorId) {
                this.props.receiveReaction(parsedData);
              } else if (parsedData.channelId === payload.channel.id) {
                this.props.receiveMessage(parsedData);
              } else { this.props.receiveNotification(parsedData); };
            }
          }
        });
        this.setState({ loading: false });
    });
  }

  componentDidMount() { this.loadChannel(); }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.channelId != this.props.match.params.channelId) this.loadChannel();
  }

  componentWillUnmount() { if(this.channel) this.channel.unsubscribe(); }

  render() {
    return (
      <div id="channel">
        <MessageFormContainer loading={this.state.loading} />
      </div>
    );
  }
};