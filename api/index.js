require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();
const cors = require('cors');

const connection = require('./database/connection');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const options = {
  origin: true,
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Headers": true,
  "Access-Control-Expose-Headers": true
};

// Handle cors pre-flight request.
app.use(cors(options));

// Inject db connection reference to requests
app.use(function(req, _res, next){
  req.db = connection;
  next();
});

// Define API routes
app.use('/api', router);

const port = process.env.PORT || 7070;
app.listen(port, async () => {
  console.log(`Listening on port ${port}`)
});

