import React from "react";
import { observer } from "mobx-react";
import model from "../model";
import VideoPlayer from "../components/video_player";
import MessageBox from "../components/message_box";
import VideoThumbnailPlaylist from "../components/video_thumbnail_playlist";
import { Link } from "react-router-dom";
import "./lobby_view.css";
export default observer(
  class LobbyView extends React.Component {
    state = {
      videos: []
    };
    componentDidMount() {
      // fetch lobby metadata
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

      // maintain the video queue
      const updateQueue = () => {
        model.lobby
          .getNewVideos(this.props.match.params.id, this.state.lastVideoId)
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
            newState.currentVideoId = newVideos[newVideos.length - 1].video;
            this.setState(newState);
          })
          .catch(err => {
            alert("failed to fetch videos: " + err);
          });
        // Change to 30000 after testing
      };

      this.updateQueueTimer = setInterval(updateQueue, 3000);
      setTimeout(updateQueue, 0);
    }

    componentWillUnmount() {
      clearInterval(this.updateQueueTimer);
    }

    render() {
      if (!this.state.lobbyInfo) {
        return <h1>Loading...</h1>;
      }

      return (
        <div className="LobbyView">
          {/* <h1>
            {this.state.lobbyInfo.title} <small>{this.state.lobbyInfo.desc}</small>
          </h1> */}
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            style={{ marginBottom: "10px" }}
          >
            <a className="navbar-brand" href="#">
              Bachmanity
              {/* <strong>{this.state.lobbyInfo.title}</strong>{" "}
              <small>{this.state.lobbyInfo.desc}</small> */}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="topOfPage">
            <div className="VideoContainer" style={{ padding: "0.5em" }}>
              <VideoPlayer videoId={this.state.currentVideoId} />
              <h1>
                {this.state.lobbyInfo.title}{" "}
                <small>{this.state.lobbyInfo.desc}</small>
              </h1>
            </div>

            <div className="MessagesContainer">
              <MessageBox lobbyId={this.props.match.params.id} />
              {/* <MessageModal lobbyId={this.props.match.params.id} /> */}
            </div>
          </div>

          <hr />
          <div className="VideoPlaylist">
            <button
              type="button"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              onClick={() => {
                const url = prompt("Please enter youtube video URL");
                if (!url) return;

                const videoId = model.youtube_url_parser(url);
                if (videoId) {
                  model.lobby.postNewVideo(this.props.match.params.id, videoId);
                } else alert("Invalid Youtube Video URL");
              }}
            >
              +
            </button>

            {this.state.videos.map(videoQueueItem => {
              return (
                <div className="PlaylistItem" key={videoQueueItem.id}>
                  <VideoThumbnailPlaylist videoId={videoQueueItem.video} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
);
