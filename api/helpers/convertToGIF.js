const fs = require('fs');
const tmp = require('tmp');

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const convertToGIF = (video, startTime, duration) => {
  return new Promise((resolve, reject) => {
    // Clean base64 data
    video = video.replace(/^data:(.*?);base64,/, "");

    // Ensure there are no spaces
    video = video.replace(/ /g, '+');

    // Create temp file for received base64
    tmp.file((err, filePath) => {
      if (err) reject(err);

      // Write content to file
      fs.writeFile(filePath, video, 'base64', (err) => {
        if (err) reject(err);

        // Create temp file name for generated GIF
        tmp.tmpName({ postfix: '.gif' }, (err, newPath) => {
          if (err) reject(err);

          //.videoCodec('libx264').audioCodec('libmp3lame').size('320x240')
          //.outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15,startTime=2,duration=1")
          
          // Generate GIF from video, cropping to start and duration.
          console.log('Will convert video to GIF');
          ffmpeg(filePath).setStartTime(startTime).setDuration(duration)
            .on('error', (err) => {
              if (err) reject(err);
            })
            .on('end', () => {
              console.log('converted successfully');
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