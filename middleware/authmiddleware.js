const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Middleware to authorize roles
function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).send({ error: 'You do not have permission to perform this action' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
