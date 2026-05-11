const Mood = require('../models/Mood');

// @desc    Create a new mood log
// @route   POST /api/moods
const createMood = async (req, res) => {
  try {
    const mood = await Mood.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Mood logged successfully',
      data: mood,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all mood logs
// @route   GET /api/moods
const getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single mood log
// @route   GET /api/moods/:id
const getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood log not found',
      });
    }
    res.status(200).json({
      success: true,
      data: mood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a mood log
// @route   PUT /api/moods/:id
const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood log not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Mood log updated successfully',
      data: mood,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a mood log
// @route   DELETE /api/moods/:id
const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood log not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Mood log deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createMood, getAllMoods, getMoodById, updateMood, deleteMood };
