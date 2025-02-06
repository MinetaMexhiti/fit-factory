const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
  const { username, password, role_id } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).send({ error: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (username, password, role_id) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [username, hashedPassword, role_id || 2]);

    console.log('Insert result:', result);

    if (!result || !result.insertId) {
      return res.status(500).send({ error: 'Failed to create user in the database' });
    }

    const newUser = { id: result.insertId, username, role_id };

    console.log('JWT_SECRET:', process.env.JWT_SECRET); 

    
    const token = jwt.sign(
      { id: newUser.id.toString(), role_id: newUser.role_id },
      process.env.JWT_SECRET,  
      { expiresIn: '1h' }
    );

    console.log('Generated Token:', token); 
    res.status(201).send({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).send({ error: 'Failed to register user.', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login attempt with username:', username);  
    const [results] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (results.length === 0) {
      console.log('No user found with the username:', username);
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    const user = results[0];
    console.log('User found:', user); 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Password is invalid.');
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    console.log('Password is valid.');

    
    console.log('JWT_SECRET:', process.env.JWT_SECRET); 


    const token = jwt.sign(
      { id: user.id.toString(), role_id: user.role_id },  
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated Token:', token); 
    res.status(200).send({ token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send({ error: 'Failed to log in.', details: error.message });
  }
};
