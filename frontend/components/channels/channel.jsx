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
          if (data.messageId) {
            this.props.removeMessage(data.messageId);
          } else {
            const message = JSON.parse(data);
            if (message.channelId === payload.channel.id) this.props.receiveMessage(message);
          }
        }});
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