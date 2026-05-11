const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['stress', 'anxiety', 'sleep', 'motivation', 'general'],
        message: 'Category must be one of: stress, anxiety, sleep, motivation, general',
      },
    },
    url: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: String,
      default: 'Admin',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
