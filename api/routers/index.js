const { Router } = require('express');
const GIFRouter = require('./GIFRouter');

const router = new Router()

router.use('/gif', GIFRouter);

module.exports = router
