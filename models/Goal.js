const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    targetDate: {
      type: Date,
      required: [true, 'Target date is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'completed', 'abandoned'],
        message: 'Status must be one of: active, completed, abandoned',
      },
      default: 'active',
    },
    progress: {
      type: Number,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot exceed 100'],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
