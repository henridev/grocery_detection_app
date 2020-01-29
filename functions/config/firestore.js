const Firestore = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "objectdetector-264912",
  keyFilename: "./firestore_key"
});

module.exports = firestore;
