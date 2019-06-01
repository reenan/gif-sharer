const { Router } = require('express');
const router = new Router()

const { uploadGIF } = require('../helpers/firebase');

router.post('/', async (req, res) => {
  //const GIFFirebaseURL = await uploadGIF(GIFPath);
  //console.log('GIFFirebaseURL: ', GIFFirebaseURL);

  res.sendStatus(200);

});

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
