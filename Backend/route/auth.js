const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

const authenticateUser = async (req, res, next) => {
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

// SIGNUP Route
router.post('/signup', async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: "All fields (name, email, password, username) are required" });
    }
    try {
        const user = new User({ name, email, password, username });
        await user.save();
        return res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error during user creation", error: error.message });
    }
});

// LOGIN Route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.password !== password) {
          return res.status(400).json({ message: "Invalid password" });
      }

      if (user.currentToken) {
          return res.status(200).json({ message: "You have been logged out from the previous device" });
      }


      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      user.currentToken = token;
      await user.save();

      return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: "Error during login", error: error.message });
  }
});


// LOGOUT Route
router.post('/logout', authenticateUser, async (req, res) => {
    try {
        req.user.currentToken = process.env.JWT_SECRET;
        await req.user.save();
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: "Error during logout", error: error.message });
    }
});

module.exports = router;
