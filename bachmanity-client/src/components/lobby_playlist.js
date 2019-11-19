import React from "react";
import model from "../model";

export default class LobbyPlaylist extends React.Component {
  state = {
    lastVideoId: 0,
    videos: []
  };

  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      model.lobby
        .getNewVideos(this.props.lobbyId, this.state.lastVideoId)
        .then(serverVideos => {
          if (serverVideos.length === 0) return;

          const newVideos = [...this.state.videos];

          for (const video of serverVideos) {
            newVideos.push(video);
          }

          newVideos.sort((a, b) => {
            return a.id - b.id;
          });

          const newState = Object.assign({}, this.state);
          newState.lastVideoId = newVideos[newVideos.length - 1].id;
          newState.videos = newVideos;
          this.setState(newState);
        })
        .catch(err => {
          alert("failed to fetch videos: " + err);
        });
        // Change to 30000 after testing
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  onChange(event) {
    const stateCpy = Object.assign({}, this.state);
    stateCpy["videoURL"] = event.target.value;
    this.setState(stateCpy);
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      const stateCpy = Object.assign({}, this.state);
      stateCpy["videoURL"] = "";
      model.lobby.postNewVideo(this.props.lobbyId, this.state.videoURL);
      this.setState(stateCpy);
    }
  }

  render() {
    const messagesDom = this.state.messages.map(msg => {
      return (
        <div className="message" key={msg.id}>
          {msg.id} : {msg.message}
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
