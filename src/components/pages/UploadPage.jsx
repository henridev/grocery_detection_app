import React, { useRef, useState } from "react";
import Salad from "../../assets/images/salad.jpg";
import drawBoxes from "../../assets/js/draw_boxes.js";

export default function UploadPage(props) {
  const { model } = props;
  const [predictions, setPredictions] = useState(null);
  // const [file, setFile] = useState(null);

  const imageRef = useRef();
  const svgRef = useRef();

  // function handleFileChange(e) {
  //   setFile(e.target.files[0]);
  // }

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
      <div class="prediction_box">
        <img
          alt="salad placeholder"
          id="salad"
          src={Salad}
          width={500}
          ref={imageRef}
        />
        <svg ref={svgRef}></svg>
      </div>
      <button onClick={handlePrediction}>handle prediction</button>
    </div>
  );
}
