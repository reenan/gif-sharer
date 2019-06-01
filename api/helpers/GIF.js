const fs = require('fs');
const tmp = require('tmp');

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const convertToGIF = (video, startTime, duration) => {
  return new Promise((resolve, reject) => {
    video = cleanBase64(video);

    // Create temp file for received base64
    tmp.file((err, filePath) => {
      if (err) reject(err);

      // Write content to file
      fs.writeFile(filePath, video, 'base64', async (err) => {
        if (err) reject(err);

        // Create temp file name for generated GIF
        const GIFTempFile = await createGIFTempFile();

        console.log('Will convert video to GIF');
        ffmpeg(filePath).setStartTime(startTime).setDuration(duration)
        .on('error', (err) => {
          if (err) reject(err);
        })
        .on('end', () => {
          console.log('converted successfully');
          resolve(GIFTempFile);
        })
        .save(GIFTempFile);
      })
    })
  })
}

const createGIFTempFile = () => {
  return new Promise((resolve, reject) => {

    tmp.tmpName({ postfix: '.gif' }, (err, newPath) => {
      if (err) reject(err);

      resolve(newPath);
    })
  })
}

const createGIFFile = (content) => {
  return new Promise(async (resolve, reject) => {

    const tempFile = await createGIFTempFile();

    content = cleanBase64(content);

    fs.writeFile(tempFile, content, 'base64', async (err) => {
      if (err) reject(err);

      resolve(tempFile);
    })
  })
}

const cleanBase64 = (content) => {
  let cleaned = content.replace(/^data:(.*?);base64,/, "");
  cleaned = cleaned.replace(/ /g, '+');

  return cleaned;
}

module.exports = {
  convertToGIF,
  createGIFFile,
}
