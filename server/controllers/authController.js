
//libraries to hash password to impport jsonwebtoken and database connection 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');


//This exports the register function so it can be used in the route file. 
//The function is asynchronous, meaning it performs database operations that may take time, and it will await those operations before continuing.
exports.register = async (req, res) => {
  const { username, password, role_id } = req.body;
  //function 
  try {
    const [existingUser] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).send({ error: 'Username already exists.' });
    }



    //iIf the username does not exist, we hash the password
    //The 10 is the number of salt rounds, which determines how complex the hashing process is.
    //The password that gets hashed is the one that the user just entered on the registration form
    const hashedPassword = await bcrypt.hash(password, 10);
    //new user details 
    const query = 'INSERT INTO Users (username, password, role_id) VALUES (?, ?, ?)';
    //executes the query 
    const [result] = await db.query(query, [username, hashedPassword, role_id || 2]); //regular user 
    console.log('Insert result:', result);

    //f there is no result, or if there is a result but the insertId is missing or invalid
    if (!result || !result.insertId) {
      return res.status(500).send({ error: 'Failed to create user in the database' });
    }


    //now we create and return the JWT 
    //newUser is an object that holds the newly created user’
    //if insertId existss  
    const newUser = { id: result.insertId, username, role_id };
    //This generates a JWT token using the user’s ID and role.
    console.log('JWT_SECRET:', process.env.JWT_SECRET); 
    const token = jwt.sign(
      { id: newUser.id.toString(), role_id: newUser.role_id },
      //The token is signed with a secret key (process.env.JWT_SECRET) and will expire in 1 hour.
      process.env.JWT_SECRET,  
      { expiresIn: '1h' }
    );

    //console.log('Generated Token:', token); 
    res.status(201).send({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).send({ error: 'Failed to register user.', details: error.message });
  }
};


//validation
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login attempt with username:', username);  
    const [results] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (results.length === 0) {
      console.log('No user found with the username:', username);
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the hashed password
    //// If user is found, continue processing their login
    const user = results[0];
    console.log('User found:', user); 


    //password comparison //It compares the provided password with the hashed password stored in the database using bcrypt. 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Password is invalid.');
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    //is isPasswordValid is true then here 
    console.log('Password is valid.');

  //debugging step to verify that the secret key is available
    console.log('JWT_SECRET:', process.env.JWT_SECRET); 


    const token = jwt.sign(
      { id: user.id.toString(), role_id: user.role_id },  
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Generated Token:', token); 
    //Send the token back to the client
    res.status(200).send({ token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send({ error: 'Failed to log in.', details: error.message });
  }
};
