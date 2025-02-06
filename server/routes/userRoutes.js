const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { authenticateToken } = require('../middleware/authmiddleware');
const { login, register } = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching user details for ID:', req.user.id);

    const [results] = await db.query(
      'SELECT id, username, email, role_id FROM Users WHERE id = ?',
      [req.user.id]
    );

    if (results.length === 0) {
      console.error('User not found:', req.user.id);
      return res.status(404).send({ error: 'User not found.' });
    }

    console.log('User details fetched successfully:', results[0]);
    res.send(results[0]);
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).send({ error: 'Failed to fetch user details.', details: error.message });
  }
});




module.exports = router;
