import React from 'react';
import YouTube from 'react-youtube';

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <YouTube
        videoId={"oHg5SJYRHA0"}
        opts={{
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: true,
            start: 60,
            disablekb: 1,
            controls: 0,
          }
        }}
      />
    )
  }
};