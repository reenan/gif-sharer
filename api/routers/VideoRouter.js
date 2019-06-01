const { Router } = require('express');
const uuid4 = require('uuid4');

const router = new Router()

const { uploadGIF } = require('../helpers/firebase');
const { convertToGIF } = require('../helpers/convertToGIF');

const { GIF } = require('../models');

router.post('/', async (req, res) => {
  const { video, startTime, duration, isPrivate, password, expirationDate } = req.body;

  if (isPrivate && !password) {
    res.status(400).send('Password is required for private GIFs');
    return;
  }

  if (duration > 5) {
    res.status(400).send('GIF duration too long');
    return;
  }

  const GIFPath = await convertToGIF(video, startTime, duration);
  const GIFFirebaseURL = await uploadGIF(GIFPath);
  
  const GIFObject = await GIF.create({
    url: GIFFirebaseURL,
    isPrivate: isPrivate,
    password: password,
    expirationDate: expirationDate
  });

  res.status(201).send({ id: GIFObject.dataValues.id });
});

module.exports = router
