const express = require('express');
const router = express.Router();
const {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

router.route('/').get(getAllGoals).post(createGoal);
router.route('/:id').get(getGoalById).put(updateGoal).delete(deleteGoal);

module.exports = router;
