const { format } = require("util");
const gcs = require("@google-cloud/storage");
const bucket = gcs.bucket("objectdetector-264912.appspot.com");
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file, bucketRef) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    console.log(originalname, buffer, "here");
    // A simulated directory is really just an object with a prefix in its name
    const blob = bucket.file("images/" + originalname.replace(/ /g, "_"));
    // console.log("hereo", blob.name, bucket.name);
    const blobStream = blob.createWriteStream({
      resumable: false
    });
    // blobStream.write(buffer, "base64");
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        console.log("resolved");
        resolve(publicUrl);
      })
      .on("error", err => {
        reject(err);
      })
      .end(buffer);
  });

module.exports = uploadImage;
