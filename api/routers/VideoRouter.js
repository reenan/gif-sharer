const { Router } = require('express');
const uuid4 = require('uuid4');

const router = new Router()

const { uploadGIF } = require('../helpers/firebase');
const { convertToGIF } = require('../helpers/convertToGIF');

const { GIF } = require('../models');

router.post('/', async (req, res) => {
  const { video, startTime, duration } = req.body;

  if (duration > 5) {
    res.status(400).send('GIF duration too long');
    return;
  }

  const GIFPath = await convertToGIF(video, startTime, duration);
  const GIFFirebaseURL = await uploadGIF(GIFPath);
  
  const GIFObject = await GIF.create({ url: GIFFirebaseURL, public: true });

  res.status(201).send({ id: GIFObject.dataValues.id });
});

module.exports = router
