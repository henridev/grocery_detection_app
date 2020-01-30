import React, { useRef, useEffect, useState } from "react";
import mobileCheck from "../../../assets/js/mobileCheck.js";

export default function Webcam(props) {
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
    // return () => {
    //   setcurrentStream(null);
    //   videoRef.current.srcObject = null;
    // };
  }, []);

  return (
    <div id="video_container">
      <video autoPlay="true" id="videoElement" ref={videoRef}></video>
    </div>
  );
}
