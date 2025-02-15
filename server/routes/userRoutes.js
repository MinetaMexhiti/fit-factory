const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { authenticateToken } = require('../middleware/authmiddleware');
const { login, register } = require('../controllers/authController');


//routes for user registration and user login
router.post('/register', register);
router.post('/login', login);


// fetches the authenticated user’s details.
router.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching user details for ID:', req.user.id);

    const [results] = await db.query(
      'SELECT id, username, email, role_id FROM Users WHERE id = ?',
      // comes from the JWT token,
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

router.put('/me', authenticateToken, async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user.id;

  try {
    // Update the user's details in the database
    const [result] = await db.query(
      'UPDATE Users SET username = ?, email = ? WHERE id = ?',
      [username, email, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error.message);
    res.status(500).json({ message: 'Failed to update user details', error: error.message });
  }
});




module.exports = router;
