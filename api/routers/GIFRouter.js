const { Router } = require('express');
const router = new Router()
const { Op } = require('sequelize')

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

  const result = await GIF.findOne({
    where: {
      id: id,
      expirationDate: {
        [Op.or]: {
          [Op.gte]: new Date(),
          [Op.eq]: null
        }
      }
    }
  });

  res.json(result)
});


module.exports = router
