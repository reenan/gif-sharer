const { uploadGIF } = require('./firebase');
const { createGIFFile, convertToGIF } = require('./GIF');

module.exports = {
  uploadGIF,
  createGIFFile,
  convertToGIF,
}
