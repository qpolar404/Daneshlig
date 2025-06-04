const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user'); // ایمپورت مدل کاربر
const app = express();
const cors = require('cors'); 

// 1. تنظیمات پایه
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // اضافه کردن این خط
app.use(express.json()); // اضافه کردن این خط برای پردازش JSON
app.use(express.urlencoded({ extended: true }));

// 2. اتصال به دیتابیس
const dbURI = 'mongodb+srv://amir:test1234@qpcodecompany.8gljb.mongodb.net/DaneshLig?retryWrites=true&w=majority&appName=qPCodeCompany';

const PORT = process.env.PORT || 3000; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))) // پورت PORT اینجا باشه
    .catch((err) => console.log(err));

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
//app.get('/profile', (req, res) => res.render('profile', { title: 'پروفایل' }));
//app.get('/change', (req, res) => res.render('change', { title: 'ویرایش پروفایل' }));
//app.get('/signUp', (req, res) => res.render('sign', { title: 'ساخت حساب' }));
app.get('/rahnamayi', (req, res) => res.render('rahnamayi', { title: 'راهنمایی استفاده از سایت' }));



// 5. صفحه 404
app.use((req, res) => res.status(404).render('404', { title: 'صفحه پیدا نشد' }));

