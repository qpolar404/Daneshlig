const express = require('express');
const router = express.Router();

// صفحه اصلی
router.get('/', (req, res) => res.render('index2', { title: 'صفحه اصلی' }));

// سایر صفحات
router.get('/anoutUs', (req, res) => res.render('anoutUs', { title: 'درباره ما' }));
router.get('/haftom', (req, res) => res.render('haftom', { title: 'هفتم' }));
router.get('/hashtom', (req, res) => res.render('hashtom', { title: 'هشتم' }));
router.get('/nohom', (req, res) => res.render('nohom', { title: 'نهم' }));
router.get('/majeraJoyi', (req, res) => res.render('majeraJoyi', { title: 'ماجراجویی' }));
//router.get('/login', (req, res) => res.render('login', { title: 'ورود', error: null }));
router.get('/BeZoudy', (req, res) => res.render('BeZoudy', { title: 'به زودی' }));
router.get('/quizShow', (req, res) => res.render('quizShow', { title: 'کوییز شو' }));
router.get('/quizRNohom', (req, res) => res.render('quizRNohom', { title: 'کوییز ریاضی' }));
router.get('/rahnamayi', (req, res) => res.render('rahnamayi', { title: 'راهنمایی استفاده از سایت' }));
router.get('/lessonsORF', (req, res) => res.render('lessonsORF', { title: 'درس‌های علوم' }));
router.get('/lessonsORN', (req, res) => res.render('lessonsORN', { title: 'درس‌های ریاضی' }));
router.get('/quizRF', (req, res) => res.render('quizRF', { title: 'کوییز علوم' }));
router.get('/lessonsORS', (req, res) => res.render('lessonsORS', { title: 'درس‌های اجتماعی' }));
router.get('/quizRS', (req, res) => res.render('quizRS', { title: 'کوییز اجتماعی' }));
//router.get('/signUp', (req, res) => res.render('sign', { title: 'ثبت نام' }));

module.exports = router;