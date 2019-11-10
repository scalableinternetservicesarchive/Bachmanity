import React from "react";

export default (props) => {
  var videoId = props.videoId
  var videoUrl = "http://img.youtube.com/vi/".concat(videoId).concat("/0.jpg")
  return (
    <div style={{
      width: "480px", height: "270px",
      backgroundImage: 'url(' + videoUrl + ')',
      backgroundPosition: 'center',
      backgroundSize: 'auto',
    }}/>
  )
}