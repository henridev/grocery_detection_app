import React, { useRef, useEffect, useState } from "react";
import drawBoxes from "../../assets/js/draw_boxes.js";
import CameraIcon from "@material-ui/icons/Camera";
import Fab from "@material-ui/core/Fab";
import mobileCheck from "../../assets/js/mobileCheck.js";

export default function Webcam(props) {
  const { model } = props;
  const svgRef = useRef();
  const canvasRef = useRef();
  const photoRef = useRef();
  const videoRef = useRef();
  const [currentStream, setcurrentStream] = useState(null);

  const constraints = {
    advanced: [
      {
        facingMode: "environment"
      }
    ]
  };

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: mobileCheck() ? constraints : true })
        .then(function(stream) {
          setcurrentStream(stream);
          videoRef.current.srcObject = stream;
        })
        .catch(function(err) {
          console.log("Something went wrong!", err);
        });
    }
  }, []);

  const handleTakePicture = async e => {
    const canvas = canvasRef.current;
    const photo = photoRef.current;
    const video = videoRef.current;
    const options = { score: 0.1, iou: 0.1, topk: 20 };
    canvas.setAttribute("width", video.videoWidth);
    canvas.setAttribute("height", video.videoHeight);
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);

    const base64_src = canvas.toDataURL("imageRef/jpg", 1);
    console.log(base64_src);

    photo.setAttribute("width", video.videoWidth);
    photo.setAttribute("height", video.videoHeight);
    photo.setAttribute("src", base64_src);

    const predictions = await model.detect(photo, options);
    console.log(predictions);
    drawBoxes(predictions, photo, svgRef);
    // Show the resulting object on the page.
    e.preventDefault();
  };

  return (
    <div>
      <div id="video_container">
        <video autoPlay="true" id="videoElement" ref={videoRef}></video>
      </div>
      <Fab color="primary" onClick={handleTakePicture}>
        <CameraIcon />
      </Fab>
    </div>
  );
}
