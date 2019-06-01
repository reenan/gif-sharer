const { Router } = require('express');
const router = new Router()

const { uploadGIF } = require('../helpers/firebase');
const { convertToGIF } = require('../helpers/convertToGIF');

router.post('/', async (req, res) => {
  const GIFPath = await convertToGIF(req.body.video);
  const GIFFirebaseURL = await uploadGIF(GIFPath);

  console.log('GIFPath: ', GIFPath, 'GIFFirebaseURL: ', GIFFirebaseURL);
})

router.get('/', async (req, res) => {
  req.db.query('SELECT * FROM gif', (error, results) => {
    if (error) {
      res.send(404);
    }

    res.json(results)
  });
})

router.get('/:id', async (req, res) => {
  res.json({});
})



module.exports = router
