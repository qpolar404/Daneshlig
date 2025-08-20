const express = require('express');
const router = express.Router();
const {
  checkUsername,
  register,
  login,
  logout
} = require('../controllers/authController');

// API Routes
//router.get('/api/check-username', checkUsername);
//router.post('/api/users', register);

// Page Routes
//router.post('/login', login);
//router.get('/logout', logout);

module.exports = router;