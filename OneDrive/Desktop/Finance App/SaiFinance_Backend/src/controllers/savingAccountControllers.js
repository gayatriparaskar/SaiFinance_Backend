const {
    errorResponse,
    successResponse,
  } = require("../helpers/successAndError");

const SavingModel = require("../models/savingaccountModel")
const UserModel = require("../models/userModel")

module.exports.getAllSavingAccount = async (req, res) => {
    try {
      const accounts = await SavingModel.find().sort({ created_on: -1 })
        .lean();
  
      res.json(
        successResponse(
          200,
          "Saving Accounts fetched successfully",
          accounts
        )
      );
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse(500, error.message));
    }
};

module.exports.getAllSavingUsers = async (req, res) => {
  try {
    const user = await UserModel.find({
      saving_account_id: { $exists: true, $ne: null }  
    })
      .populate("saving_account_id")
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

module.exports.getSavingAccountById = async (req, res) => {
  try {
    const id = req.params.id;

    
    const account = await SavingModel.findOne({user_id :id}).populate("user_id").lean();

    
    if (!account) {
      return res.status(404).json(errorResponse(404, "Account not found"));
    }
    res.status(200).json({message:"Account Found",account})
    // res.json(successResponse(200, "Account found", account));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.updateAccount = async (req, res) => {
  try {
    const account = await SavingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!account) {
      return res.status(404).json(errorResponse(404, "Account not found"));
    }
    res.json(successResponse(200, "Account updated successfully", account));
  } catch (error) {
    console.error(error);
    res.status(400).json(errorResponse(400, error.message));
  }
};

module.exports.deleteAccount = async (req, res) => {
  try {
    const account = await OfficerModel.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json(errorResponse(404, "Account not found"));
    }
    res.json(successResponse(200, "Account deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};


