import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VideoThumbnail from "../components/video_thumbnail";
import "./lobby_list_item.css";

export default class LobbyListItem extends React.Component {
  render() {
    return (
      <div className="LobbyItem">
        <VideoThumbnail
          className="VideoThumbnail shadow-sm bg-white rounded"
          videoId={this.props.videoId}
        />

        <div
          className="content"
          style={{ overflow: "wrap", wordBreak: "break-all" }}
        >
          <h5 className="font-weight-bold">{this.props.lobbyTitle}</h5>
          <div
            style={{
              width: "350px",
              overflow: "wrap",
              wordBreak: "break-word"
            }}
          >
            <p>{this.props.lobbyDesc}</p>
          </div>
        </div>
      </div>
    );
  }
}
