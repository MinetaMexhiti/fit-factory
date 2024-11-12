const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Admin only route for adding products
router.post('/add', authenticateToken, authorizeRole(1), async (req, res) => {
  const { name, description, price, category_id, brand_id, color, size, quantity } = req.body;
  try {
    const query = 'INSERT INTO Products (name, description, price, category_id, brand_id, color, size, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [name, description, price, category_id, brand_id, color, size, quantity]);
    res.status(201).send({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add product', details: error });
  }
});

// Allow admin and advanced users to view all orders
router.get('/orders', authenticateToken, authorizeRole(1, 2), async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM Orders');
    res.json(orders);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve orders' });
  }
});

module.exports = router;
