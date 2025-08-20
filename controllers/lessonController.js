const Book = require('../models/lessons');
const Teach = require('../models/teaches');

// مدیریت درخواست‌های درس‌ها
exports.sendLessonId = async (req, res) => {
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
};

// نمایش صفحه درس
exports.getLesson = async (req, res) => {
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
};

// جستجوی درس‌ها
exports.searchLessons = async (req, res) => {
  const { grade, subject, title } = req.body;

  try {
    const lessonDetails = await Teach.findOne({
      grade: grade,
      bookName: subject,
      lessonName: title
    }).lean();

    if (!lessonDetails) {
      return res.status(404).json({
        success: false,
        message: "درس مورد نظر یافت نشد"
      });
    }

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
};

// نمایش جزئیات درس
exports.getLessonDetails = async (req, res) => {
  try {
    const { grade, subject, title } = req.params;

    const lesson = await Teach.findOne({
      grade: decodeURIComponent(grade),
      bookName: decodeURIComponent(subject),
      lessonName: decodeURIComponent(title)
    });

    if (!lesson) {
      return res.status(404).render('404', { title: 'درس پیدا نشد!' });
    }

    res.render('lessonDetails', {
      title: `جزئیات ${lesson.lessonName}`,
      lesson: lesson
    });

  } catch (error) {
    console.error("خطا در نمایش جزئیات درس:", error);
    res.status(500).render('500', { title: 'خطای سرور' });
  }
};