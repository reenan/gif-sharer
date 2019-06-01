const mysql = require('mysql');
const port = process.env.PORT || 3306;

var connection = mysql.createConnection({
  port: port,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gif-sharer',
  insecureAuth: true
});

connection.connect();

module.exports = connection;