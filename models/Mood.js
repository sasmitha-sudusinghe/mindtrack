const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
    },
    moodScore: {
      type: Number,
      required: [true, 'Mood score is required'],
      min: [1, 'Mood score must be between 1 and 10'],
      max: [10, 'Mood score must be between 1 and 10'],
    },
    stressLevel: {
      type: Number,
      required: [true, 'Stress level is required'],
      min: [1, 'Stress level must be between 1 and 10'],
      max: [10, 'Stress level must be between 1 and 10'],
    },
    sleepHours: {
      type: Number,
      required: [true, 'Sleep hours is required'],
      min: [0, 'Sleep hours cannot be negative'],
      max: [24, 'Sleep hours cannot exceed 24'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [300, 'Note cannot exceed 300 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mood', moodSchema);
