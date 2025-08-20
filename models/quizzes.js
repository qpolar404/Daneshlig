const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    explanation: String
});

const quizSchema = new mongoose.Schema({
    title: String,
    grade: String,
    subject: String,
    chapter: String,
    questions: [questionSchema]
});

module.exports = mongoose.model('quizzes', quizSchema, );