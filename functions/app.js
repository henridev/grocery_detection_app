const express = require("express");
const cors = require("cors");
const model = require("./model/model.json");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const gcs = require("@google-cloud/storage");
const uploadImage = require("./util/uploadImage.js");

const bucket = gcs.bucket("objectdetector-264912.appspot.com");
const app = express();

app.use(
  cors({
    origin: true
  })
);

app.get("/model/model.json", (req, res) => {
  console.log("sending model");
  res.status(200).json(model);
});

app.get("/model/dict.txt", (req, res) => {
  console.log("sending dict");
  res
    .status(200)
    .sendFile("dict.txt", { root: path.join(__dirname, "./model") });
});

app.get("/model/group1-shard1of3.bin", (req, res) => {
  console.log("sending shard");
  res.status(200).sendFile("group1-shard1of3.bin", {
    root: path.join(__dirname, "./model")
  });
});

app.get("/model/group1-shard2of3.bin", (req, res) => {
  console.log("sending shard");
  res.status(200).sendFile("group1-shard2of3.bin", {
    root: path.join(__dirname, "./model")
  });
});

app.get("/model/group1-shard3of3.bin", (req, res) => {
  console.log("sending shard");
  res.status(200).sendFile("group1-shard3of3.bin", {
    root: path.join(__dirname, "./model")
  });
});

app.post(
  "/uploadImg/$userId",
  multerMid.single("file"),
  async (req, res, next) => {
    try {
      const myFile = req.file;
      const imageUrl = await uploadImage(myFile, bucket);
      console.log(imageUrl);
      return res.status(200).json({
        message: "Upload was successful",
        data: imageUrl
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: err });
    }
  }
);

module.exports = app;
