const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  if (token) {
    // Verify the token
    jwt.verify(token, 'process.env.JWT', (err, user) => {
      if (err) {
        // Invalid token
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // Valid token, set the user information in the request object
        req.user = user;
        next();
      }
    });
  } else {
    // Token not found
    res.status(401).json({ message: 'Token not found' });
  }
};

module.exports = {
  authenticateJWT,
};
