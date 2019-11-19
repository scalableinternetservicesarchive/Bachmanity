import React from "react";
import model from "../model";
import "./message_box.css";

export default class MessageBox extends React.Component {
  state = {
    lastMessageId: 0,
    messages: []
  };

  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      model.lobby
        .getNewMessages(this.props.lobbyId, this.state.lastMessageId)
        .then(serverMessages => {
          if (serverMessages.length === 0) return;

          const newMessages = [...this.state.messages];

          for (const message of serverMessages) {
            newMessages.push(message);
          }

          newMessages.sort((a, b) => {
            return b.id - a.id;
          });

          const newState = Object.assign({}, this.state);
          newState.lastMessageId = newMessages[0].id;
          newState.messages = newMessages;
          this.setState(newState);
        })
        .catch(err => {
          alert("failed to fetch messages: " + err);
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  onChange(event) {
    const stateCpy = Object.assign({}, this.state);
    stateCpy["message"] = event.target.value;
    this.setState(stateCpy);
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      const stateCpy = Object.assign({}, this.state);
      stateCpy["message"] = "";
      model.lobby.postMessage(this.props.lobbyId, this.state.message);
      this.setState(stateCpy);
    }
  }

  render() {
    console.log(this.state.messages);
    const messagesDom = this.state.messages.map(msg => {
      return (
        <div className="message" key={msg.id}>
          <strong>{msg.sender_name}</strong>: {msg.message}
        </div>
      );
    });

    return (
      <div className="messageBox">
        <input
          className="messageInput"
          name="message"
          onKeyPress={this.onKeyPress.bind(this)}
          value={this.state.message}
          onChange={this.onChange.bind(this)}
        />
        {messagesDom}
      </div>
    );
  }
}
