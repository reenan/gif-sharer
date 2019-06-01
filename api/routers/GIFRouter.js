const { Router } = require('express');
const router = new Router()

const { uploadGIF } = require('../helpers/firebase');

const { GIF } = require('../models');

router.post('/', async (req, res) => {
  //const GIFFirebaseURL = await uploadGIF(GIFPath);
  //console.log('GIFFirebaseURL: ', GIFFirebaseURL);

  res.sendStatus(200);

});

router.get('/', async (_req, res) => {
  const results = await GIF.findAll();
  res.json(results)
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await GIF.findByPk(id);
  res.json(result)
});


module.exports = router
