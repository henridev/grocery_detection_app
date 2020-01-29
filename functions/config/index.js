const Cloud = require("@google-cloud/storage");
const { Storage } = Cloud;
const path = require("path");
console.log(__dirname);
const serviceKey = path.join(__dirname, "./key.json");
console.log(serviceKey);
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "objectdetector-264912"
});

module.exports = storage;
