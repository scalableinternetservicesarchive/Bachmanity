import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VideoThumbnail from "../components/video_thumbnail_playlist";
import "./lobby_list_item.css";

export default class LobbyListItem extends React.Component {
  render() {
    return (
      <div className="LobbyItem">
        <VideoThumbnail
          className="VideoThumbnail"
          videoId={this.props.videoId}
        />
        <div className="content">
          <h5>{this.props.lobbyTitle}</h5>
          <p>{this.props.lobbyDesc}</p>
        </div>
      </div>
    );
  }
}
