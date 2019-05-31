const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router);

const port = process.env.PORT || 7070;

app.listen(port, async () => {
  console.log(`Listening on port ${port}`)
});

