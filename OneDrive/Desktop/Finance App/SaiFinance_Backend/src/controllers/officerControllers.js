const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const OfficerModel = require("../models/officerModel");

// Create an officer
module.exports.createOfficer = async (req, res) => {
  try {
    const officer = new OfficerModel(req.body);
    await officer.save();
    res
      .status(201)
      .json(successResponse(201, "Officer created successfully", officer));
  } catch (error) {
    console.error(error);
    res.status(400).json(errorResponse(400, error.message));
  }
};

// Get all officers
module.exports.getAllOfficers = async (req, res) => {
  try {
    const officers = await OfficerModel.find().sort({ created_on: -1 }).lean();
    res.json(successResponse(200, "Officers retrieved successfully", officers));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

// Get an officer by ID
module.exports.getOfficerById = async (req, res) => {
  try {
    const officer = await OfficerModel.findById(req.params.id).lean();
    if (!officer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }
    res.json(successResponse(200, "Officer found", officer));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

// Update an officer
module.exports.updateOfficer = async (req, res) => {
  try {
    const officer = await OfficerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!officer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }
    res.json(successResponse(200, "Officer updated successfully", officer));
  } catch (error) {
    console.error(error);
    res.status(400).json(errorResponse(400, error.message));
  }
};

// Delete an officer
module.exports.deleteOfficer = async (req, res) => {
  try {
    const officer = await OfficerModel.findByIdAndDelete(req.params.id);
    if (!officer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }
    res.json(successResponse(200, "Officer deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};
