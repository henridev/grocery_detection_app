import React, { useRef, useEffect } from "react";
import drawBoxes from "../../../assets/js/draw_boxes.js";

export default function PredictionContainer(props) {
  const { predictions } = props;
  const imageRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    if (predictions) {
      const image = imageRef.current;
      const svg = svgRef.current;
      svg.setAttribute("width", image.width);
      svg.setAttribute("height", image.height);
      drawBoxes(predictions, image, svg);
    }
  }, [predictions]);

  return (
    <div id="prediction_container" className="hidden">
      <canvas id="canvas"></canvas>
      <img alt="photoRef placeholder" id="photoRef" ref={imageRef} />
      <svg ref={svgRef}></svg>
    </div>
  );
}
