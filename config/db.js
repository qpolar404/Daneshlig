const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://amir:test1234@qpcodecompany.8gljb.mongodb.net/DaneshLig?retryWrites=true&w=majority&appName=qPCodeCompany';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {

    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;