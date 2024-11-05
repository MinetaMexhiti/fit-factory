const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'new_password',
  database: 'fit_factory', 
});

module.exports = db;
