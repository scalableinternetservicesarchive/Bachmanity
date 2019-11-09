import React from 'react';
import YouTube from 'react-youtube';

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={{
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: true,
            start: 0,
            disablekb: 1,
            controls: 0,
          }
        }}
      />
    )
  }
};