import React, { useRef, useState } from "react";

import drawBoxes from "../../assets/js/draw_boxes.js";
import Webcam from "../utils/Webcam.jsx";

export default function UploadPage(props) {
  const { model } = props;
  const [predictions, setPredictions] = useState(null);

  const imageRef = useRef();
  const svgRef = useRef();

  const handlePrediction = async e => {
    const image = imageRef.current;
    const svg = svgRef.current;
    svg.setAttribute("width", image.width);
    svg.setAttribute("height", image.height);
    const options = { score: 0.4, iou: 0.4, topk: 20 };
    const results = await model.detect(image, options);
    console.log(results);
    drawBoxes(results, image, svg);
    setPredictions(results);
    e.preventDefault();
  };

  return (
    <div>
      <Webcam model={model} />
    </div>
  );
}
