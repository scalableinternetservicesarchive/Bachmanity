import React from "react";
import YouTube from "react-youtube";

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <center>
        <YouTube
          videoId={this.props.videoId}
          opts={{
            width: "100%",
            height: window.innerHeight * 0.75,
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: true,
              start: 0,
              disablekb: 0,
              controls: 1
            }
          }}
        />
      </center>
    );
  }
}
