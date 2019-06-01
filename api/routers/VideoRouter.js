const { Router } = require('express');
const router = new Router()

const { uploadGIF } = require('../helpers/firebase');
const { convertToGIF } = require('../helpers/convertToGIF');

router.post('/', async (req, res) => {
  const { video, startPosition, duration } = req.body;

  const GIFPath = await convertToGIF(video, startPosition, duration);
  //const GIFFirebaseURL = await uploadGIF(GIFPath);
  //console.log('GIFPath: ', GIFPath, 'GIFFirebaseURL: ', GIFFirebaseURL);

  res.sendStatus(200);

});

module.exports = router
