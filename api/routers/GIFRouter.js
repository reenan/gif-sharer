const { Router } = require('express');
const router = new Router()
const { Op } = require('sequelize')

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

  const result = await GIF.findOne({
    where: {
      id: id,
      expirationDate: {
        [Op.gte]: new Date()
      }
    }
  });

  res.json(result)
});


module.exports = router
