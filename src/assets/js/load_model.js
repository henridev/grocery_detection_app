// import * as tf from "@tensorflow/tfjs";

export default async function run() {
  const model = await window.tf.automl.loadObjectDetection(
    "https://europe-west1-objectdetector-264912.cloudfunctions.net/api/model/model.json"
  );
  return model;
}
