const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  // پایه تحصیلی
  grade: {
    type: String,
    required: true,
    trim: true
  },

  // نام کتاب
  bookName: {
    type: String,
    required: true,
    trim: true
  },

  // نام درس
  lessonName: {
    type: String,
    required: true,
    trim: true
  },

  // بخش‌های درس (آرایه‌ای از آبجکت‌ها)
  sections: [{
    // عنوان بخش
    title: {
      type: String,
      required: true,
      trim: true
    },
    
    // محتوای آموزشی
    content: {
      type: String,
      required: true,
      trim: true
    },
    
    // ترتیب نمایش (اختیاری)
    order: {
      type: Number,
      default: 0
    }
  }]
}, { 
  timestamps: true 
});


module.exports= mongoose.model('Teaches', lessonSchema)