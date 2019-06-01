const { Router } = require('express');

const GIFRouter = require('./GIFRouter');
const VideoRouter = require('./VideoRouter');

const router = new Router()

router.use('/gif', GIFRouter);
router.use('/video', VideoRouter);

module.exports = router
