const jwt = require('jsonwebtoken');
const UserDB = require('../models/usermodel');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserDB.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const companyOnly = (req, res, next) => {
    if (req.user.role !== 'company') {
        return res.status(403).json({ message: 'Company only' });
    }
    next();
};

const userOnly = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'User only' });
    }
    next();
};

module.exports = { authMiddleware, companyOnly, userOnly };
