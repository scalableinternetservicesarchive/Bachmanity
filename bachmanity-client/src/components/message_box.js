import React from "react";
import model from "../model";
import "./message_box.css";
import { Modal, Button } from "react-bootstrap";
export default class MessageBox extends React.Component {
  state = {
    lastMessageId: 0,
    messages: [],
    showModal: false
  };

  componentDidMount() {
    const refreshMessages = () => {
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
    };
    this.intervalTimer = setInterval(refreshMessages, 2000);
    refreshMessages();
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  // state = {
  //   showModal: false
  // };

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
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
    const messagesDom = this.state.messages.map(msg => {
      return (
        <div className="message" key={msg.id}>
          <strong>{msg.sender_name}</strong>: {msg.message}
        </div>
      );
    });

    return (
      <div>
        <a className="btn" onClick={this.open.bind(this)}>
          <div style={{ margin: "0px 0px -5px 5px" }}>
            <i class="material-icons">forum</i>
          </div>
          Chat
        </a>

        <div>
          <Modal
            className="modal-container"
            show={this.state.showModal}
            onHide={this.close.bind(this)}
            animation={true}
            bsSize="small"
            backdrop={false}
            diaglogClassName="modal-right-fade"
            centered={false}
            scrollable={true}
            keyboard={true}
          >
            <Modal.Header closeButton>
              {/* <Modal.Title>Chat</Modal.Title> */}
              <input
                className="form-control"
                name="message"
                onKeyPress={this.onKeyPress.bind(this)}
                value={this.state.message}
                onChange={this.onChange.bind(this)}
              />
            </Modal.Header>

            <Modal.Body>
              <div className="messageBox">{messagesDom}</div>
            </Modal.Body>

            <Modal.Footer>
              {/* <Button onClick={this.close.bind(this)}>Close</Button> */}
              <p>
                Use <kbd>Enter</kbd> to send message. Use <kbd>Esc</kbd> to
                close chat window.
              </p>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
