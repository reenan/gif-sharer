const { Router } = require('express');
const router = new Router()
const fetch = require('fetch-base64');

const { GIF } = require('../models');
const { uploadGIF, createGIFFile } = require('../helpers');

router.post('/', async (req, res) => {
  const { GIF: GIFData, isPrivate, password, expiresAt } = req.body;

  // Simple check to avoid missmatch
  if (isPrivate && !password) {
    res.status(400).send('Password is required for private GIFs');
    return;
  }

  // Create GIF file from sent data
  const GIFFile = await createGIFFile(GIFData);

  // Upload GIF file to firebase
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.headers;

  // Get GIF data
  const result = await GIF.unscoped().findByPk(id);

  // Handle empty result from query
  if (result == null) {
    const message = 'Requested GIF does not exists'

    res.status(404).send({ message });
    return;
  }

  const { isPrivate, expiresAt, password: GIFPassword } = result.dataValues;

  // Handle expiration checking
  if (expiresAt && expiresAt < new Date()) {
    const message = `This GIF expired on ${new Date(expiresAt).toLocaleDateString()}`

    res.status(410).send({ message });
    return;
  }

  // Handle private checking
  if (isPrivate && password !== GIFPassword) {
    res.sendStatus(401);
    return;
  }

  // Fetch base64 from firebase
  fetch.remote(result.dataValues.url).then((data) => {

    // Return GIF data to client
    res.json({result, base64: data[1]});
  }).catch(() => res.sendStatus(500));
});

module.exports = router
