// models/Product.js
const db = require('../server');

// Product model
const Product = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM Products';
        db.query(sql, callback);
    },
    getById: (id, callback) => {
        const sql = 'SELECT * FROM Products WHERE id = ?';
        db.query(sql, [id], callback);
    },
    create: (product, callback) => {
        const sql = 'INSERT INTO Products SET ?';
        db.query(sql, product, callback);
    },
    update: (id, product, callback) => {
        const sql = 'UPDATE Products SET ? WHERE id = ?';
        db.query(sql, [product, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM Products WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Product;
