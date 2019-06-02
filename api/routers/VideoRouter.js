const { Router } = require('express');

const router = new Router()

const { uploadGIF, convertToGIF } = require('../helpers');
const { GIF } = require('../models');

router.post('/', async (req, res) => {
  const { video, startTime, duration, isPrivate, password, expiresAt } = req.body;

  // Simple checks to avoid missmatches
  if (isPrivate && !password) {
    res.status(400).send('Password is required for private GIFs');
    return;
  }

  if (duration > 5) {
    res.status(400).send('GIF duration too long');
    return;
  }

  // Create GIF from request data
  const GIFFile = await convertToGIF(video, startTime, duration);

  // Upload generated GIF to firebase
  const GIFFirebaseURL = await uploadGIF(GIFFile);

  // Persist GIF data on database
  const GIFObject = await GIF.create({
    url: GIFFirebaseURL,
    isPrivate: isPrivate,
    password: password,
    expiresAt: expiresAt
  });

  // Return created ID
  res.status(201).send({ id: GIFObject.dataValues.id });
});

module.exports = router
