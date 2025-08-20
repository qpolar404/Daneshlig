const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  grade: { type: String, required: true, trim: true },
  bookName: { type: String, required: true, trim: true },
  lessonName: { type: String, required: true, trim: true },

  // آرایه بخش‌ها
  sections: [{
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true }, // متن بخش (اختیاری)
    

    // لینک ویدیو (آپارات)
   videoEmbedCode: { type: String, trim: true },

    order: { type: Number, default: 0 }
  }],

  // آرایه کوییزها مربوط به درس
  quizzes: [{
    question: { type: String, required: true, trim: true },
    image: { filename: String, data: String }, // تصویر کوییز
    options: [{
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false }
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Teaches', lessonSchema);
