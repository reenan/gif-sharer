const { Router } = require('express');

const router = new Router()

router.get('/', async (req, res) => {
  res.json({});
})

router.get('/:id', async (req, res) => {
  res.json({});
})

router.post('/', async (req, res) => {
  res.status(200);
})

module.exports = router
