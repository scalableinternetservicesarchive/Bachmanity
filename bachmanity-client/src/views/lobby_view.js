import React from "react";
import { observer } from "mobx-react";
import model from "../model";
import VideoPlayer from "../components/video_player";
import MessageBox from "../components/message_box";
import VideoThumbnailPlaylist from "../components/video_thumbnail_playlist";

import "./lobby_view.css";

export default observer(
  class LobbyView extends React.Component {
    state = {};
    componentDidMount() {
      model.lobby
        .getInfo(this.props.match.params.id)
        .then(lobbyInfo => {
          const stateCpy = Object.assign({}, this.state);
          stateCpy.lobbyInfo = lobbyInfo;
          this.setState(stateCpy);
        })
        .catch(err => {
          alert("Failed to load lobby" + err);
        });

      model.lobby
        .getQueue(this.props.match.params.id)
        .then(queue => {
          const stateCpy = Object.assign({}, this.state);
          stateCpy.queue = queue;
          this.setState(stateCpy);
        })
        .catch(err => {
          alert("Failed to load the lobby video queue: " + err);
        });
    }

    render() {
      if (!this.state.lobbyInfo) {
        return <h1>Loading...</h1>;
      }

      return (
        <div className="LobbyView">
          <h1>
            {this.state.lobbyInfo.title} <small>{this.state.lobbyInfo.desc}</small>
          </h1>

          <div className="topOfPage">
            <div className="VideoContainer">
              {/*need to add to queue*/}
              <VideoPlayer videoId={this.state.queue} />
            </div>

            <div className="VideoPlaylist">
              <h4>Video Playlist</h4>
              <ul>
                {this.state.queue &&
                  this.state.queue.map(videoQueueItem => {
                    const videoId = videoQueueItem.video;
                    return (
                      <div>
                        <VideoThumbnailPlaylist videoId={videoId} />
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="MessagesContainer">
            <MessageBox lobbyId={this.props.match.params.id} />
          </div>
        </div>
      );
    }
  }
);
