import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VideoThumbnail from "../components/video_thumbnail_playlist";
import "./lobby_list_item.css";

export default class LobbyListItem extends React.Component {
  render() {
    return (
      // <header className="bg-primary text-center py-5 mb-4">
      //   <div className="container">
      //     <h1 className="font-weight-light text-white">Meet the Team</h1>
      //   </div>
      // </header>

      // <div className="container">
      //   <div className="row">
      //     <div className="col-xl-3 col-md-6 mb-4">
      //       <div className="card border-0 shadow">
      //         <img
      //           src={`http://img.youtube.com/vi/${this.props.videoId}/0.jpg`}
      //           className="card-img-top"
      //           alt="..."
      //         />
      //         <div className="card-body text-center">
      //           <h5 className="card-title mb-0">{this.props.lobbyTitle}</h5>
      //           <div className="card-text text-black-50">
      //             {this.props.lobbyDesc}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      // <div class="col-lg-3 col-md-4 col-6">
      //   <img
      //     class="img-fluid img-thumbnail"
      //     src={`http://img.youtube.com/vi/${this.props.videoId}/0.jpg`}
      //     alt=""
      //   />
      // </div>

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
