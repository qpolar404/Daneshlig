const Quiz = require('../models/quizzes');

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();
    if (!quiz) {
      return res.status(404).render('404');
    }
    res.render('quiz', { quiz });
  } catch (error) {
    console.error(error);
    res.status(500).render('error');
  }
};

exports.createQuizSearch = async (req, res) => {
  try {
    const { grade, book, subject, title } = req.body;
    const searchBook = book || subject;

    if (!grade || !searchBook || !title) {
      return res.status(400).json({ message: 'اطلاعات کافی ارسال نشده' });
    }

    const quiz = await Quiz.findOne({
      grade,
      title,  // اضافه شده برای دقیق‌تر شدن جستجو
      $or: [
        { book: searchBook },
        { subject: searchBook }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: 'کوییز یافت نشد' });
    }

    res.json({ success: true, redirectUrl: `/quiz/${quiz._id}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطای سرور' });
  }
};

