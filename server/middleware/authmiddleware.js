const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; //get authorization header
  const token = authHeader && authHeader.split(' ')[1]; //extract  token 

  if (!token) {
    console.error('No token provided.');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  //validate the token 
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }

    //if valid  the decoded payload 
    req.user = user;
    next(); //if oke go on
  });
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role_id !== requiredRole) {
      console.error(`Access denied. Expected role: ${requiredRole}, User role: ${req.user?.role_id}`);
      return res.status(403).json({ error: 'Access denied. Insufficient role privileges.' });
    }
    next(); //if correct access 
  };
}

module.exports = { authenticateToken, authorizeRole };
