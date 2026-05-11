const Resource = require('../models/Resource');

// @desc    Create a new resource
// @route   POST /api/resources
const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Resource added successfully',
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
const getAllResources = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single resource
// @route   GET /api/resources/:id
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }
    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createResource, getAllResources, getResourceById, updateResource, deleteResource };
