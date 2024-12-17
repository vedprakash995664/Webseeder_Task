const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.currentToken !== token) {
            return res.status(401).json({ message: "You have been logged out." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};
