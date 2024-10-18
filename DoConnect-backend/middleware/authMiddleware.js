// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Assuming token is sent as 'Bearer <token>'
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check for admin role
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Admin resources. Access denied.' });
  }
};
