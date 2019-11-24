import React from "react";

export default props => {
  var videoId = props.videoId;
  var videoUrl = "http://img.youtube.com/vi/".concat(videoId).concat("/0.jpg");

  const defaultStyle = {
    width: "240px",
    height: "135px",
    backgroundImage: "url(" + videoUrl + ")",
    backgroundPosition: "center",
    backgroundSize: "100% 100%"
  };
  Object.assign(defaultStyle, props.style || {});
  return <div style={defaultStyle} />;
};
