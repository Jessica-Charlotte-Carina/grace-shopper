const authenticateAdmin = (req, res, next) => {
    // Check if the user is authenticated and is an admin
    if (req.user && req.user.type === 'admin') {
      // User is authenticated and is an admin, proceed to the next middleware
      next();
    } else {
      // User is not authenticated or is not an admin, return an error response
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = {
    authenticateAdmin,
  };