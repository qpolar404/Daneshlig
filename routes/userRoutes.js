const express = require('express');
const router = express.Router();
const { getProfile, createTestUser } = require('../controllers/userController');

// روت‌های کاربران
router.get('/profile', getProfile);
router.get('/create-user', createTestUser);

module.exports = router;