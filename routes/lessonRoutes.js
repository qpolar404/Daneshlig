const express = require('express');
const router = express.Router();
const {
  sendLessonId,
  getLesson,
  searchLessons,
  getLessonDetails
} = require('../controllers/lessonController');

// API Routes
router.post('/sendid', sendLessonId);
router.post('/api/lessons', searchLessons);

// Page Routes
router.get('/lesson/:id', getLesson);
router.get('/lesson-details/:grade/:subject/:title', getLessonDetails);

module.exports = router;