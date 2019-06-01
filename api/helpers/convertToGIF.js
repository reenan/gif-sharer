const fs = require('fs');
const tmp = require('tmp');

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const convertToGIF = (base64Data) => {
  return new Promise((resolve, reject) => {
    // Clean base64 data
    base64Data = base64Data.replace(/^data:(.*?);base64,/, "");

    // Ensure there are no spaces
    base64Data = base64Data.replace(/ /g, '+');

    // Create temp file for received base64
    tmp.file((err, filePath) => {
      if (err) reject(err);

      // Write content to file
      fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) reject(err);

        // Create temp file name for generated GIF
        tmp.tmpName({ postfix: '.gif' }, (err, newPath) => {
          if (err) reject(err);

          //.videoCodec('libx264').audioCodec('libmp3lame').size('320x240')
          ffmpeg(filePath)//.outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15,startTime=2,duration=1")
            .setDuration(2)
            .on('error', (err) => {
              if (err) reject(err);
            })
            .on('end', () => {
              resolve(newPath);
            })
            .save(newPath);
        })
      })
    })
  })
}

module.exports = {
  convertToGIF
}