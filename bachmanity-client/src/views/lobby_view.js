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
            newState.currentVideoId = newVideos[0].video;
            this.setState(newState);
          })
          .catch(err => {
            alert("failed to fetch videos: " + err);
          });
        // Change to 30000 after testing
      };

      this.updateQueueTimer = setInterval(updateQueue, 5000);
      setTimeout(updateQueue, 0);
    }

    // deleteVideoFromQueue = () => {
    //   model.lobby.deleteVideos(this.state.lobbyId,this.state.lastVideoId)
    // }

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
            className="navbar sticky-top navbar-expand-lg navbar-light shadow-sm bg-white"
            style={{ marginBottom: "10px" }}
          >
            <a className="navbar-brand" href="/">
              SyncBach
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
                <li className="nav-item"></li>
              </ul>
              <span className="navbar-text">
                <Link className="btn nav-link" to="/">
                  <div style={{ margin: "0px 0px -5px 5px" }}>
                    <i class="material-icons">view_module</i>
                  </div>
                  Feed
                </Link>
              </span>
              <span className="navbar-text">
                <MessageBox lobbyId={this.props.match.params.id} />
              </span>

              {/* <span className="navbar-text">
                <a
                  className="btn nav-link"
                  onClick={() => {
                    model.user.logout();
                  }}
                >
                  <div style={{ margin: "0px 0px -5px 0px" }}>
                    <i class="material-icons"> exit_to_app</i>
                  </div>
                  Logout
                </a>
              </span> */}
            </div>
          </nav>

          <div className="topOfPage">
            <div className="VideoContainer" style={{ padding: "0.5em" }}>
              <VideoPlayer videoId={this.state.currentVideoId} />
              <h1>
                {this.state.lobbyInfo.title} <br />
              </h1>
              <h5>{this.state.lobbyInfo.desc}</h5>
            </div>

            {/* <div className="MessagesContainer">
              <MessageBox lobbyId={this.props.match.params.id} />
            </div> */}
          </div>

          <hr />
          <div className="VideoPlaylist">
            <button
              type="button"
              // className="btn btn-outline-dark"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
              onClick={() => {
                const url = prompt("Please enter youtube video URL");
                if (!url) return;

                const videoId = model.youtube_url_parser(url);
                if (videoId) {
                  model.lobby.postNewVideo(this.props.match.params.id, videoId);
                } else alert("Invalid Youtube Video URL");
              }}
            >
              <i class="material-icons">add</i>
            </button>

            {this.state.videos.map(videoQueueItem => {
              return (
                <button
                  className="PlaylistItem shadow p-3 mb-3 bg-white rounded"
                  key={videoQueueItem.id}
                  onClick={() => {
                    this.setState({ currentVideoId: videoQueueItem.video });
                  }}
                >
                  <VideoThumbnailPlaylist videoId={videoQueueItem.video} />
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  }
);
