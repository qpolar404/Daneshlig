const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose'); // اضافه کردم برای health check

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const quizRoutes = require('./routes/quizRoutes');         // API کوییز
const quizPageRoutes = require('./routes/quizRoutes'); // صفحه کوییز (render)

const Teach = require('./models/teaches');
const Quiz = require('./models/quizzes');
const { result } = require('lodash');
// ایجاد اپلیکیشن
const app = express();

// اتصال به دیتابیس
connectDB();

// تنظیمات view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewareها
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key-123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// مونت کردن روت‌ها
app.use('/', pagesRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', lessonRoutes);

app.use('/quiz', quizPageRoutes);      // روت صفحه کوییز: GET /quiz/:id
app.use('/api/quizzes', quizRoutes);   // API کوییز

// تست سلامت سرور و دیتابیس
app.get('/health', (req, res) => {
  res.json({ status: 'OK', dbState: mongoose.connection.readyState });
});

// 404 handler
app.use((req, res) => res.status(404).render('404', { title: 'صفحه پیدا نشد' }));
app.listen(3000, () => console.log("Server running on port 3000"));