import React from "react";
import model from "../model";
import VideoThumbnailPlaylist from "./video_thumbnail_playlist";

export default class LobbyPlaylist extends React.Component {
  state = {
    lastVideoId: 0,
    videos: []
  };

  componentDidMount() {}

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
    return (
      <div className="VideoPlaylist">
        <h4>Video Playlist</h4>
        {this.state.videos.map(videoQueueItem => {
          return (
            <div key={videoQueueItem.id}>
              <VideoThumbnailPlaylist videoId={videoQueueItem.video} />
            </div>
          );
        })}
      </div>
    );
  }
}
