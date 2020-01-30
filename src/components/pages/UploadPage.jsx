import React, { useRef, useState } from "react";
import UploadComponent from "../utils/UploadComponent.jsx";
import drawBoxes from "../../assets/js/draw_boxes.js";
import Button from "@material-ui/core/Button";

export default function UploadPage(props) {
  const { model } = props;
  const [state, setState] = useState({ prediction: null, original_pic: null });

  const imageRef = useRef();
  const svgRef = useRef();

  function onFileSelected(pictureFile) {
    var reader = new FileReader();

    var imgtag = imageRef.current;
    imgtag.title = pictureFile.name;

    reader.onload = function(event) {
      imgtag.onload = () => {
        console.log("this width", this.width);
        if (imgtag.width > window.innerWidth / 2) {
          imgtag.setAttribute("width", window.innerWidth * 0.5);
        }
        if (imgtag.height > window.innerHeight / 2) {
          imgtag.setAttribute("height", window.innerHeight * 0.5);
        }
      };
      imgtag.src = event.target.result;
      console.log(imgtag.width, "width  ");
    };

    reader.readAsDataURL(pictureFile);
  }

  function handleFileChangeBtn(e) {
    const picture = e.target.files[0];
    setState({ ...state, original_pic: picture });
    onFileSelected(picture);
    imageRef.current.classList.remove("hidden");
    svgRef.current.classList.remove("hidden");
  }

  function handleFileChangeDrop(picture) {
    setState({ ...state, original_pic: picture });
    onFileSelected(picture);
    imageRef.current.classList.toggle("hidden");
    svgRef.current.classList.toggle("hidden");
  }

  const handlePrediction = async e => {
    const image = imageRef.current;
    const svg = svgRef.current;
    svg.setAttribute("width", image.width);
    svg.setAttribute("height", image.height);
    const options = { score: 0.4, iou: 0.4, topk: 20 };
    const results = await model.detect(image, options);
    console.log(results);
    drawBoxes(results, image, svg);
    setState({ ...state, predictions: results });
    e.preventDefault();
  };

  return (
    <div className="uploadPage">
      <UploadComponent handleFileChange={handleFileChangeDrop}>
        <input
          type="file"
          value={state.original_pic ? null : state.original_pic}
          name="file"
          id="file"
          onChange={handleFileChangeBtn}
          className="inputs-edit-file"
        />

        <label for="file">drop or select image</label>
      </UploadComponent>
      <div className="prediction_container">
        <img
          alt="salad placeholder"
          id="salad"
          className="hidden"
          ref={imageRef}
        />
        <svg ref={svgRef} className="hidden"></svg>
      </div>
      <Button onClick={handlePrediction} variant="contained" color="primary">
        handle prediction
      </Button>
    </div>
  );
}
// {
//   /* <div class="prediction_box">
//   <img
//     alt="salad placeholder"
//     id="salad"
//     src={Salad}
//     width={500}
//     ref={imageRef}
//   />
//   <svg ref={svgRef}></svg>
// </div> */
// }
