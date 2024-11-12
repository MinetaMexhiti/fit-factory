const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware'); // import auth functions

// User Registration API
router.post('/register', async (req, res) => {
  const { username, password, role_id } = req.body;

  try {
    // Check for existing user
    const [existingUser] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (existingUser.length > 0) return res.status(400).send({ error: 'Username already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (username, password, role_id) VALUES (?, ?, ?)';
    await db.query(query, [username, hashedPassword, role_id || 3]); // Default to role_id 3 (simple user)
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to register user.', details: error });
  }
});

// User Login API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (results.length === 0) return res.status(401).send({ error: 'User not found' });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Failed to log in.' });
  }
});

// Protected Route Example (Admin Only)
router.get('/admin', authenticateToken, authorizeRole(1), (req, res) => {
  res.send('Welcome Admin! You have access to this route.');
});

module.exports = router;
