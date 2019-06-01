const { Router } = require('express');
const router = new Router()
const { Op } = require('sequelize')
const fetch = require('fetch-base64');

const { uploadGIF, createGIFFile } = require('../helpers');
const { GIF } = require('../models');

router.post('/', async (req, res) => {
  const { GIF: GIFData, isPrivate, password, expirationDate } = req.body;

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
    expirationDate: expirationDate
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
    res.sendStatus(404);
    return;
  }

  if (result.dataValues.expirationDate && result.dataValues.expirationDate < new Date()) {
    res.sendStatus(410);
    return;
  }
  
  const { isPrivate, password: GIFPassword } = result.dataValues;

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
