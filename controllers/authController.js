const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.query;
    
    if (!username || username.length < 3) {
      return res.status(400).json({
        status: 'error',
        message: 'نام کاربری باید حداقل 3 کاراکتر داشته باشد'
      });
    }

    const userExists = await User.findOne({ username });
    
    res.status(200).json({
      status: 'success',
      available: !userExists,
      message: userExists ? 'نام کاربری موجود است' : 'نام کاربری آزاد است'
    });

  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({
      status: 'error',
      message: 'خطا در بررسی نام کاربری'
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({
        status: 'error',
        message: 'تمام فیلدها الزامی هستند'
      });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'این نام کاربری قبلاً ثبت شده است'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'ثبت نام با موفقیت انجام شد',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
      }
    });

  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({
      status: 'error',
      message: 'خطا در ثبت نام کاربر'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { 
        title: 'ورود',
        error: 'نام کاربری یا رمز عبور اشتباه است'
      });
    }

    req.session.userId = user._id;
    res.redirect('/profile');

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('خطای سرور');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};