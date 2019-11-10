import React from "react";
import model from "../model";

export default class MessageBox extends React.Component {
  state = {
    lastMessageId: 0,
    messages: [],
  }

  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      model.lobby.getNewMessages(this.props.lobbyId, this.state.lastMessageId)
        .then((serverMessages) => {
          if (serverMessages.length === 0)
            return ;
          
          let newLastMessageId = this.state.lastMessageId;
          const newMessages = [...this.state.messages];

          for (const message of serverMessages) {
            newLastMessageId = Math.max(message.id, newLastMessageId);
            newMessages.push(message);
          }

          this.setState({
            lastMessageId: newLastMessageId,
            messages: newMessages,
          });
        })
        .catch(err => {
          alert("failed to fetch messages: " + err);
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  render() {
    const messagesDom = this.state.messages.map((msg) => {
      return <li key={msg.id}>{msg.message}</li>
    });

    return (
      <div>
        <p>Messages: </p>
        {messagesDom}
      </div>
    );
  }
}