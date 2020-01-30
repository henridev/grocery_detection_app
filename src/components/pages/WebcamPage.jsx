import React, { useRef, useState } from "react";
import PredictionContainer from "../utils/webcam_page/PredictionContainer.jsx";
import Webcam from "../utils/webcam_page/Webcam.jsx";
import PictureButton from "../utils/webcam_page/PictureButton.jsx";
import RetakeButton from "../utils/webcam_page/RetakeButton.jsx";

export default function UploadPage(props) {
  const { model } = props;
  const [displayState, setDisplayState] = useState("camera");
  const [predictions, setPredictions] = useState(null);
  const [options, setOptions] = useState({ score: 0.5, iou: 0.5, topk: 20 });

  const makePrediction = async (photo, options) => {
    setDisplayState("picture");
    const predictions = await model.detect(photo, options);
    setPredictions(predictions);
    return predictions;
  };

  return (
    <div>
      <Webcam model={model} />
      {displayState === "camera" ? (
        <PictureButton makePrediction={makePrediction} options={options} />
      ) : (
        <RetakeButton setDisplayState={setDisplayState} />
      )}
      <PredictionContainer predictions={predictions} />
    </div>
  );
}
