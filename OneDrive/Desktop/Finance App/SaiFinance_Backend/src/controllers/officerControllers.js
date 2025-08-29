const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const OfficerModel = require("../models/officerModel");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create an officer
module.exports.createOfficer = async (req, res) => {
  try {
    const {
      officer_code,
      name,
      phone_number,
      email,
      pan,
      aadhar,
      dob,
      is_active,
      role = "officer" // Default role
    } = req.body;

    // Validate role
    const validRoles = ["admin", "manager", "accounter", "officer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json(errorResponse(400, "Invalid role. Must be one of: admin, manager, accounter, officer"));
    }

    // Check if officer with same email or phone already exists
    const existingOfficer = await OfficerModel.findOne({
      $or: [{ email }, { phone_number }]
    });

    if (existingOfficer) {
      return res.status(400).json(errorResponse(400, "Officer with this email or phone number already exists"));
    }

    // Create officer
    const officer = new OfficerModel({
      officer_code,
      name,
      phone_number,
      email,
      pan,
      aadhar,
      dob,
      is_active,
      role
    });

    await officer.save();

    // Create corresponding user account
    try {
      // Generate a default password (officer_code + "123")
      const defaultPassword = `${officer_code}123`;
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const user = new UserModel({
        full_name: name,
        email: email,
        phone_number: phone_number,
        password: hashedPassword,
        role: role,
        is_active: is_active,
        is_deleted: false
      });

      await user.save();

      // Return success response with both officer and user info
      res.status(201).json(successResponse(201, "Officer and user account created successfully", {
        officer,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          defaultPassword: defaultPassword // Include default password for admin reference
        }
      }));

    } catch (userError) {
      // If user creation fails, delete the officer and return error
      await OfficerModel.findByIdAndDelete(officer._id);
      console.error("User creation error:", userError);
      return res.status(400).json(errorResponse(400, "Failed to create user account: " + userError.message));
    }

  } catch (error) {
    console.error("Officer creation error:", error);
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
    const { role } = req.body;
    
    // Validate role if provided
    if (role) {
      const validRoles = ["admin", "manager", "accounter", "officer"];
      if (!validRoles.includes(role)) {
        return res.status(400).json(errorResponse(400, "Invalid role. Must be one of: admin, manager, accounter, officer"));
      }
    }

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

    // Update corresponding user account if role changed
    if (role) {
      try {
        await UserModel.findOneAndUpdate(
          { email: officer.email },
          { role: role },
          { new: true, runValidators: true }
        );
      } catch (userError) {
        console.error("User role update error:", userError);
        // Don't fail the officer update if user update fails
      }
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
    const officer = await OfficerModel.findById(req.params.id);
    if (!officer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }

    // Delete corresponding user account
    try {
      await UserModel.findOneAndDelete({ email: officer.email });
    } catch (userError) {
      console.error("User deletion error:", userError);
      // Continue with officer deletion even if user deletion fails
    }

    await OfficerModel.findByIdAndDelete(req.params.id);
    res.json(successResponse(200, "Officer and user account deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};
