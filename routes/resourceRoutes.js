const express = require('express');
const router = express.Router();
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');

router.route('/').get(getAllResources).post(createResource);
router.route('/:id').get(getResourceById).put(updateResource).delete(deleteResource);

module.exports = router;
