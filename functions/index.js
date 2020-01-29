const functions = require("firebase-functions");
const admin = require("firebase-admin");
const handleImageUpload = require("./onImageUpload.js");
const app = require("./app");

// Automatically allow cross-origin requests
admin.initializeApp();

// Expose Express API as a single Cloud Function:
const api = functions.region("europe-west1").https.onRequest(app);

// const onImageUpload = functions.storage
//   .object()
//   .region("europe-west1")
//   .onFinalize(handleImageUpload);

module.exports = {
  api
  // onImageUpload
};
