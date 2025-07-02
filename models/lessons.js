// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titles: { // تغییر از title به titles و تبدیل به آرایه
    type: [String], // آرایه‌ای از رشته‌ها
    required: true,
  },
   nameId: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['هفتم', 'هشتم', 'نهم']
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);