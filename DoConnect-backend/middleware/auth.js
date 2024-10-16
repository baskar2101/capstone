const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).send('Access denied');
    }
};
