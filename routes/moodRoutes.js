const express = require('express');
const router = express.Router();
const {
  createMood,
  getAllMoods,
  getMoodById,
  updateMood,
  deleteMood,
} = require('../controllers/moodController');

router.route('/').get(getAllMoods).post(createMood);
router.route('/:id').get(getMoodById).put(updateMood).delete(deleteMood);

module.exports = router;
