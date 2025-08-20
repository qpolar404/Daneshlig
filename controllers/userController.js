const User = require('../models/users');
const bcrypt = require('bcrypt');

// نمایش پروفایل کاربر
exports.getProfile = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  
  try {
    const user = await User.findById(req.session.userId);
    res.render('profile', {
      title: 'پروفایل',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        score: user.score || 0
      }
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.redirect('/login');
  }
};

// ایجاد کاربر تستی (برای توسعه)
exports.createTestUser = async (req, res) => {
  try {
    const user = new User({
      username: 'AMqpIR',
      password: await bcrypt.hash('password', 10),
      firstName: 'Hossein',
      lastName: 'mokhtary'
    });

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// سایر متدهای کاربران می‌توانند اینجا اضافه شوند