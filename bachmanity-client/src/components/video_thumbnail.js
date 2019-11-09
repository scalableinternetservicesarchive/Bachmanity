import React from "react";

export default (props) => {
  return (
    <img src="http://img.youtube.com/vi/{props.videoId}/0.jpg" style={{width: "100%", height: "100%"}} />
  )
}