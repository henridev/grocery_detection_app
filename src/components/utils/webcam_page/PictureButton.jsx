import React from "react";
import CameraIcon from "@material-ui/icons/Camera";
import Fab from "@material-ui/core/Fab";

export default function PictureButton(props) {
  const handleTakePicture = async e => {
    const predictionContainer = document.getElementById("prediction_container");
    const videoContainer = document.getElementById("video_container");
    console.log(videoContainer, "here ");
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const photo = document.querySelector("img");
    const video = document.querySelector("video");

    canvas.setAttribute("width", video.videoWidth);
    canvas.setAttribute("height", video.videoHeight);

    context.drawImage(video, 0, 0);
    const base64_src = canvas.toDataURL("imageRef/jpg", 1);

    photo.setAttribute("width", video.videoWidth);
    photo.setAttribute("height", video.videoHeight);

    photo.onload = () => {
      console.log("loaded");
      const image = document.querySelector("img");
      props.makePrediction(image, props.options);
      predictionContainer.classList.toggle("hidden");
      videoContainer.classList.toggle("hidden");
    };
    photo.setAttribute("src", base64_src);
  };

  return (
    <Fab color="primary" onClick={handleTakePicture}>
      <CameraIcon />
    </Fab>
  );
}
