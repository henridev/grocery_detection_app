import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Fab from "@material-ui/core/Fab";

export default function RetakeButton(props) {
  const setupCamera = () => {
    props.setDisplayState("camera");
    const videoContainer = document.getElementById("video_container");
    const predictionContainer = document.getElementById("prediction_container");
    videoContainer.classList.toggle("hidden");
    predictionContainer.classList.toggle("hidden");
  };

  return (
    <Fab color="primary" onClick={setupCamera}>
      <ReplayIcon />
    </Fab>
  );
}
