import dataUrlToBlob from "./dataUrlToBlob.js";
import axios from "axios";

export default function(image) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", image.width);
  canvas.setAttribute("width", image.width);
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  const img_src = canvas.toDataURL("image/jpg", 1);
  const blob = dataUrlToBlob(img_src);
  const formData = new FormData();
  formData.append("file", blob, "new_me.jpg");
  axios
    .post(
      "https://europe-west1-objectdetector-264912.cloudfunctions.net/api/uploadImg",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then(res => console.log("uploaded to", res.data))
    .catch(err => console.error(err));
}
