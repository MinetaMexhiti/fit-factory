// middleware/authMiddleware.js
function authMiddleware(req, res, next) {
  console.log('Auth Middleware Triggered');
  next(); //We Allow the request to proceed
}

module.exports = authMiddleware; 
