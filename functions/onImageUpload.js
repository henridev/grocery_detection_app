const gcs = require("@google-cloud/storage");
const bucket = gcs.bucket("objectdetector-264912.appspot.com");
const path = require("path");
const os = require("os");

const onImageUpload = event => {
  const _bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;
  console.log("file change detected function execution started", filePath);

  // stop an infinite loop
  if (path.basename(filePath).startsWith("renamed")) {
    console.log("already renamed");
    return 0;
  }

  const dest_bucket = gcs.bucket(_bucket); // should be your bucket name
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };

  dest_bucket
    .file(filePath)
    .download({
      destination: tmpFilePath
    })
    .then(() => {
      return dest_bucket.upload(tmpFilePath, {
        destination: "renamed/" + path.basename(filePath),
        metadata: metadata
      });
    })
    .catch(err => {
      console.log(err);
      return 0;
    });
};

module.exports = onImageUpload;
