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

// استارت سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on Port:${PORT} ✓`);
  console.log(`health Link: http://localhost:${PORT}/health`);
});


app.get('/lessonCreat', (req,res)=>{
const teach=new Teach(
  {
  "grade": "هفتم",
  "bookName": "ریاضی",
  "lessonName": "درس پنجم",
  "sections": [
    {
      "title": "بخش اول: شمارنده‌ها",
      "content": "<p>شمارنده‌های یک عدد، اعدادی هستند که آن عدد بر آن‌ها بخش‌پذیر است.</p><p><strong>مثال:</strong> شمارنده‌های 12: 1، 2، 3، 4، 6، 12</p><p>هر عدد حداقل دو شمارنده دارد: 1 و خودش.</p><p>👉 این پایهٔ همه مفاهیم بعدی دربارهٔ اول بودن و مرکب بودن اعداد است.</p>",
      "order": 1
    },
    {
      "title": "بخش دوم: اعداد اول و مرکب",
      "content": "<ul><li><strong>عدد اول:</strong> بزرگ‌تر از 1 و دقیقاً دو شمارنده دارد (1 و خودش).<br><strong>مثال:</strong> 2، 3، 5، 7، 11</li><li><strong>عدد مرکب:</strong> بزرگ‌تر از 1 و بیش از دو شمارنده دارد.<br><strong>مثال:</strong> 4، 6، 8، 9، 12</li></ul><p>👉 اینجا یاد می‌گیری کدام عدد ساده و بنیادی است و کدام عدد چند بخش دارد.</p>",
      "order": 2
    },
    {
      "title": "بخش سوم: روش تعیین اعداد اول",
      "content": "<p>برای فهمیدن اول بودن یک عدد:</p><ul><li>عدد را بر اعداد کوچکتر از خودش امتحان کن (به جز 1).</li><li>اگر هیچ‌کدام بخش‌پذیر نبود → عدد اول است.</li></ul><p><strong>مثال:</strong> 13 → بخش‌پذیری بر 2، 3، 4، 5، 6؟ نه → پس 13 عدد اول است.</p><p><strong>مثال:</strong> 15 → بخش‌پذیری بر 3 → بله → پس 15 مرکب است.</p><p>👉 اینجا پایهٔ استدلال ریاضی را هم یاد می‌گیری: چطور با دلیل ثابت می‌کنیم عدد اول یا مرکب است.</p>",
      "order": 3
    },
    {
      "title": "بخش چهارم: قواعد و نکات مهم",
      "content": "<ul><li>عدد 1 عدد اول نیست.</li><li>عدد 2 تنها عدد اول زوج است.</li><li>همهٔ اعداد اول بزرگ‌تر از 2 فرد هستند.</li></ul><p>👉 این نکات مثل قوانین بازی هستند که باید بدانید تا در حل تمرین‌ها اشتباه نکنید.</p>",
      "order": 4
    },
    {
      "title": "بخش پنجم: تمرین و کاربرد",
      "content": "<ul><li>شمارنده‌های عدد 18 را پیدا کن → 1، 2، 3، 6، 9، 18</li><li>مشخص کن کدام اعداد اول هستند: 9، 11، 15، 17 → 11 و 17 اول هستند</li><li>یک عدد مرکب و یک عدد اول بین 20 و 30 → مرکب: 24، اول: 23</li></ul><p>👉 این بخش کمک می‌کند مفاهیم را در ذهن تثبیت کنی و خودت استدلال کنی.</p>",
      "order": 5
    }
  ]
}

)

teach.save().then(result => res.send(result)).catch(err => res.status(err))

})