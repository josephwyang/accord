import React from "react";
import MessagesIndexContainer from "../messages/messages_index_container"
import MessageFormContainer from "../messages/message_form_container"

export default class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages
    };
  }

  loadChannel() {
    this.props.getChannel().then(({ payload }) => {
      this.channel = App.cable.subscriptions.create({ channel: "MessagesChannel", channelId: payload.channel.id },
        { received: data => this.props.receiveMessage(JSON.parse(data)) });
    })
  }

  componentDidMount() { this.loadChannel(); }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.channelId != this.props.match.params.channelId) { this.loadChannel(); }
  }

  componentWillUnmount() { if(this.channel) { this.channel.unsubscribe(); } }

  render() {
    return (
      <div id="channel">
        <MessagesIndexContainer />
        <MessageFormContainer />
      </div>
    );
  }
};