const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      minlength: 3
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    city: { type: String, required: true },
    fullName: { type: String, required: true },
    gear: { type: String, required: true },
    phoneNumber: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          return /^09\d{9}$/.test(v);
        },
        message: 'شماره تلفن معتبر نیست'
      }
    }
  }, { timestamps: true });
  
module.exports = mongoose.model('User', userSchema);