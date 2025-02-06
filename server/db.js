const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'fit_factory',
});

const db = {
  getConnection: async () => await pool.getConnection(),
  query: (sql, params) => pool.query(sql, params),
};

module.exports = db;
