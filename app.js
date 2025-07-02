const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/lessons');
const Teach = require('./models/teaches');
const app = express();
const cors = require('cors');

// 1. تنظیمات پایه
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. اتصال به دیتابیس
const dbURI = 'mongodb+srv://amir:test1234@qpcodecompany.8gljb.mongodb.net/DaneshLig?retryWrites=true&w=majority&appName=qPCodeCompany';
const PORT = process.env.PORT || 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch(err => console.log('MongoDB connection error:', err));




app.get('/teaches/save-science-8th', (req, res) => {
   const teach = new Teach({
     "grade": "هشتم",
     "bookName": "علوم",
     "lessonName": "فصل اول",
     "sections": [
       {
         "title": "تعریف مخلوط",
         "content": "مخلوط به ماده‌ای گفته می‌شود که از ترکیب دو یا چند ماده خالص به وجود آمده باشد.\n\nانواع مخلوط:\n1. مخلوط همگن (محلول): اجزاء به صورت یکنواخت پراکنده شده‌اند مثل آب نمک\n2. مخلوط ناهمگن: اجزاء به صورت غیریکنواخت پراکنده شده‌اند مثل سالاد",
         "order": 1
       },
       {
         "title": "اجزای تشکیل دهنده مخلوط",
         "content": "1. فاز مایع: مانند آب در آب نمک\n2. فاز جامد: مانند نمک در آب نمک\n3. فاز گاز: مانند هوا در نوشابه\n\nنکته: در مخلوط همگن فقط یک فاز قابل مشاهده است.",
         "order": 2
       },
       {
         "title": "روش‌های جداسازی مخلوط‌ها",
         "content": "1. صاف کردن: برای جدا کردن مواد جامد از مایع\n2. تبخیر: برای جدا کردن مواد حل شده در مایعات\n3. تقطیر: برای جدا کردن مایعات مخلوط\n4. سانتریفیوژ: برای جدا کردن مواد با چگالی مختلف\n5. کروماتوگرافی: برای جدا کردن مواد حل شده",
         "order": 3
       },
       {
         "title": "محلول‌ها و غلظت",
         "content": "محلول = حلال + حل شونده\n\nغلظت مقدار ماده حل شده در مقدار معینی از حلال است.\n\nواحدهای غلظت:\n- گرم بر لیتر\n- درصد جرمی\n- مولاریته",
         "order": 4
       },
       {
         "title": "کاربردهای عملی",
         "content": "1. تصفیه آب: جداسازی ناخالصی‌ها از آب\n2. صنایع غذایی: تولید نوشیدنی‌ها\n3. پزشکی: تولید داروها\n4. محیط زیست: بازیافت مواد\n5. صنعت نفت: پالایش نفت خام",
         "order": 5
       }
     ]
   });

   teach.save()
     .then(savedDoc => res.json({
       success: true,
       message: "فصل اول علوم هشتم با موفقیت ذخیره شد",
       data: savedDoc
     }))
     .catch(err => res.status(500).json({
       success: false,
       message: "خطا در ذخیره اطلاعات",
       error: err.message
     }));
});
// 3. مسیرهای اصلی
app.get('/', (req, res) => res.render('index2', { title: 'صفحه اصلی' }));
app.get('/anoutUs', (req, res) => res.render('anoutUs', { title: 'درباره ما' }));
app.get('/haftom', (req, res) => res.render('haftom', { title: 'هفتم' }));
app.get('/hashtom', (req, res) => res.render('hashtom', { title: 'هشتم' }));
app.get('/nohom', (req, res) => res.render('nohom', { title: 'نهم' }));
app.get('/majeraJoyi', (req, res) => res.render('majeraJoyi', { title: 'ماجراجویی' }));
app.get('/login', (req, res) => res.render('login', { title: 'ورود' }));
app.get('/BeZoudy', (req, res) => res.render('BeZoudy', { title: 'به زودی' }));
app.get('/quizShow', (req, res) => res.render('quizShow', { title: 'کوییز شو' }));
app.get('/quizRNohom', (req, res) => res.render('quizRNohom', { title: 'کوییز ریاضی' }));
app.get('/rahnamayi', (req, res) => res.render('rahnamayi', { title: 'راهنمایی استفاده از سایت' }));

// مسیرهای API
app.post('/sendid', async (req, res) => {
    try {
        const { bookname } = req.body;
        const lesson = await Book.findOne({ nameId: bookname });
        
        if (!lesson) {
            return res.status(404).json({ error: 'درس پیدا نشد!' });
        }

        res.status(200).json({
            redirectUrl: `/lesson/${lesson.nameId}`,
            lessonData: lesson
        });
    } catch (err) {
        console.error('Error in /sendid:', err);
        res.status(500).json({ error: 'خطای سرور' });
    }
});

app.get('/lesson/:id', async (req, res) => {
    try {
        const lesson = await Book.findOne({ nameId: req.params.id });
        if (!lesson) {
            return res.status(404).render('404', { title: 'درس پیدا نشد!' });
        }
        res.render('lessonPage', { 
            title: lesson.subject,
            lesson: lesson 
        });
    } catch (err) {
        console.error('Error in /lesson/:id:', err);
        res.status(500).render('500', { title: 'خطای سرور' });
    }
});

app.post('/api/lessons', async (req, res) => {
    const { grade, subject, title } = req.body;
    
    try {
        // جستجو در دیتابیس برای یافتن سند کامل
        const lessonDetails = await Teach.findOne({
            grade: grade,
            bookName: subject,
            lessonName: title
        }).lean(); // استفاده از lean() برای دریافت آبجکت ساده

        if (!lessonDetails) {
            return res.status(404).json({
                success: false,
                message: "درس مورد نظر یافت نشد"
            });
        }

        // ارسال اطلاعات کامل به همراه URL صفحه جدید
        res.status(200).json({
            success: true,
            redirectUrl: `/lesson-details/${encodeURIComponent(grade)}/${encodeURIComponent(subject)}/${encodeURIComponent(title)}`,
            lessonData: lessonDetails
        });

    } catch (error) {
        console.error("خطا در جستجوی درس:", error);
        res.status(500).json({
            success: false,
            message: "خطای سرور در پردازش درخواست"
        });
    }
});
app.get('/lesson-details/:grade/:subject/:title', async (req, res) => {
    try {
        const { grade, subject, title } = req.params;
        
        // دوباره جستجو برای اطمینان (یا می‌توانید از session/state استفاده کنید)
        const lesson = await Teach.findOne({
            grade: decodeURIComponent(grade),
            bookName: decodeURIComponent(subject),
            lessonName: decodeURIComponent(title)
        });

        if (!lesson) {
            return res.status(404).render('404', { title: 'درس پیدا نشد!' });
        }

        // رندر صفحه با تمام اطلاعات درس
        res.render('lessonDetails', {
            title: `جزئیات ${lesson.lessonName}`,
            lesson: lesson
        });

    } catch (error) {
        console.error("خطا در نمایش جزئیات درس:", error);
        res.status(500).render('500', { title: 'خطای سرور' });
    }
});
// 5. صفحه 404
app.use((req, res) => res.status(404).render('404', { title: 'صفحه پیدا نشد' }));
