const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const router = express.Router();

// User Registration API
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUserQuery = 'SELECT * FROM Users WHERE username = ?';
        const [existingUser] = await db.query(existingUserQuery, [username]);

        if (existingUser.length > 0) {
            return res.status(400).send({ error: 'Username already exists.' });
        }

        if (!password || password.length < 6) {
            return res.status(400).send({ error: 'Password must be at least 6 characters long.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultRoleId = 2;

        const query = 'INSERT INTO Users (username, password, role_id) VALUES (?, ?, ?)';
        await db.query(query, [username, hashedPassword, defaultRoleId]);

        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ error: 'Failed to register user.' });
    }
});

// User Login API
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Attempting to log in with username:", username);

    try {
        const query = 'SELECT * FROM Users WHERE username = ?';
        const [results] = await db.query(query, [username]);

        if (results.length === 0) {
            return res.status(401).send({ error: 'User not found' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT secret is missing");
            return res.status(500).send({ error: 'JWT secret is not set on the server.' });
        }

        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error("Error in login route:", error);
        return res.status(500).send({ error: 'Failed to log in.', details: error.message });
    }
});

module.exports = router;
