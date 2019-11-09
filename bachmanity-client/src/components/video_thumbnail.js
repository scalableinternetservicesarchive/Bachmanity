import React from "react";

export default (props) => {
  var videoId = props.videoId
  var videoUrl = "http://img.youtube.com/vi/".concat(videoId).concat("/0.jpg")
  return (
    <img src={videoUrl} style={{width: "100%", height: "100%"}}/>
  )
}