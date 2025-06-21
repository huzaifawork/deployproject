const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB; 