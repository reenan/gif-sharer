const { Router } = require('express');
const router = new Router()
const fetch = require('fetch-base64');

const { uploadGIF, createGIFFile } = require('../helpers');
const { GIF } = require('../models');

router.post('/', async (req, res) => {
  const { GIF: GIFData, isPrivate, password, expiresAt } = req.body;

  if (isPrivate && !password) {
    res.status(400).send('Password is required for private GIFs');
    return;
  }

  const GIFFile = await createGIFFile(GIFData);
  const GIFFirebaseURL = await uploadGIF(GIFFile);

  const GIFObject = await GIF.create({
    url: GIFFirebaseURL,
    isPrivate: isPrivate,
    password: password,
    expiresAt: expiresAt
  });

  res.status(201).send({ id: GIFObject.dataValues.id });

});

router.get('/', async (_req, res) => {
  const results = await GIF.findAll();
  res.json(results)
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.headers;

  const result = await GIF.unscoped().findByPk(id);

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

    res.json({result, base64: data[1]});
  }).catch(() => res.sendStatus(500));
});

module.exports = router
