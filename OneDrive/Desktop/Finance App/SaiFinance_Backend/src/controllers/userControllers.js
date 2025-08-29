const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const LoanDetailModel = require("../models/loanDetailModel");
const UserModel = require("../models/userModel");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

module.exports.getUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
      .populate("active_loan_id")
      .lean()
      .select("-password");

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    res.json(successResponse(200, "User found", user));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find({
      active_loan_id: { $exists: true, $ne: null }  
    })
      .populate("active_loan_id saving_account_id")
      .sort({ created_on: -1 })
      .lean()
      .select("-password -role -pan_no");

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    res.json(successResponse(200, "User found", user));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

//update user by admin
module.exports.updateUserById = async (req, res) => {
  try {
    const bodyData = req.body;
    const userId = req.params.id;
    if (req.body.password) {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      if (!hashedPassword) {
        // Handle password hashing error
        return res
          .status(500)
          .json(errorResponse(500, "Password hashing failed"));
      }
      req.body.password = hashedPassword;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    })
      .lean()
      .select("-password -role -pan_no");

    if (bodyData.loan_details) {
      //update loan details model
      await LoanDetailModel.findOneAndUpdate(
        { user_id: userId },
        { $set: bodyData.loan_details },
        { new: true, runValidators: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    res.json(
      successResponse(
        200,
        "User updated successfully with loan details",
        updatedUser
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

//update a user take userid from req.userId
module.exports.updateUser = async (req, res) => {
  try {
    delete req.body.password;
    delete req.body.loan_details;
    delete req.body.role;
    delete req.body.created_on;
    delete req.body._id;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true, runValidators: true }
    )
      .lean()
      .select("-password -role -pan_no");

    if (!updatedUser) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    res.json(successResponse(200, "User updated successfully", updatedUser));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    // Retrieve user information from the database
    const user = await UserModel.findById(req.userId)
      .select("-password -role")
      .populate("active_loan_id saving_account_id")
      .lean();

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found in user list"));
    }

    // Respond with the user profile
    res.status(200).json(successResponse(200, "User profile", user));
  } catch (error) {
    console.log(error.message);
    // Handle bad request
    res.status(400).json(errorResponse(400,"something went wrong", error.message));
  }
};

// Delete an officer
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json(errorResponse(404, "Officer not found in the list of officers"));
    }
    res.json(successResponse(200, "Officer deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};