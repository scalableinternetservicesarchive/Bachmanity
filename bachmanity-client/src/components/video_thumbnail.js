import React from "react";

export default props => {
  var videoId = props.videoId;
  var videoUrl = "http://img.youtube.com/vi/".concat(videoId).concat("/0.jpg");

  const defaultStyle = {
    width: "380px",
    height: "270px",
    backgroundImage: "url(" + videoUrl + ")",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    borderRadius: "5px"
  };
  Object.assign(defaultStyle, props.style || {});
  return <div style={defaultStyle} />;
};
