const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const DailyCollectionModel = require("../models/dailyCollectionModel");
const LoanDetailModel = require("../models/loanDetailModel");
const OfficerModel = require("../models/officerModel");
const UserModel = require("../models/userModel");

module.exports.handleDailyCollection = async (req, res) => {
  try {
    const {
      addPenaltyFlag,
      penaltyType,
      penaltyValue,
      amount,
      collected_officer_id,
      collected_officer_code,
    } = req.body;

    if (!collected_officer_code) {
      return res
        .status(400)
        .json(errorResponse(400, "Collected officer code is required"));
    }

    const user = await UserModel.findById(req.userId)
      .select("officer_id")
      .populate({
        path: "officer_id",
        select: "officer_code name",
      })
      .populate({
        path: "active_loan_id",
        select:
          "loan_amount principle_amount interest_rate total_due_amount total_penalty_amount",
      })
      .lean();

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const loanDetails = user.active_loan_id;
    let collectingOfficer = user.officer_id;

    if (collected_officer_id) {
      collectingOfficer = await OfficerModel.findById(collected_officer_id)
        .lean()
        .select("officer_code name");
    }

    if (!loanDetails) {
      return res.status(404).json(errorResponse(404, "Loan detail not found"));
    }
    if (!loanDetails.total_due_amount) {
      return res
        .status(400)
        .json(errorResponse(400, "Loan amount is already paid"));
    }
    if (amount > loanDetails.total_due_amount) {
      return res
        .status(400)
        .json(errorResponse(400, "Collected amount exceeds total due amount"));
    }

    if (collectingOfficer.officer_code !== collected_officer_code) {
      return res.status(403).json(errorResponse(403, "Invalid officer code"));
    }

    let updatedLoanDetail;
    let newCollection;

    if (addPenaltyFlag) {
      let penaltyToAdd = 0;

      if (penaltyType === "percentage") {
        penaltyToAdd = loanDetails.total_due_amount * (penaltyValue / 100);
      } else if (penaltyType === "amount") {
        penaltyToAdd = penaltyValue;
      }

      updatedLoanDetail = await LoanDetailModel.findByIdAndUpdate(
        loanDetails._id,
        {
          total_due_amount:
            Number(loanDetails.total_due_amount ?? 0) + penaltyToAdd,
          total_penalty_amount:
            Number(loanDetails.total_penalty_amount ?? 0) + penaltyToAdd,
        },
        { new: true }
      ).lean();

      newCollection = new DailyCollectionModel({
        user_id: user._id,
        loan_detail_id: loanDetails._id,
        amount: 0,
        total_penalty_amount: updatedLoanDetail.total_penalty_amount,
        collected_by: collectingOfficer._id,
        collected_officer_name: collectingOfficer.name,
      });
    } else {
      updatedLoanDetail = await LoanDetailModel.findByIdAndUpdate(
        loanDetails._id,
        {
          total_penalty_amount: 0,
          total_due_amount: loanDetails.total_due_amount - amount,
        },
        { new: true }
      ).lean();

      newCollection = new DailyCollectionModel({
        user_id: user._id,
        loan_detail_id: loanDetails._id,
        amount,
        total_penalty_amount: updatedLoanDetail.total_penalty_amount,
        collected_by: collectingOfficer._id,
        collected_officer_name: collectingOfficer.name,
      });
    }

    await newCollection.save();

    return res.json(
      successResponse(
        201,
        addPenaltyFlag
          ? `Penalty applied (${
              penaltyType === "percentage"
                ? penaltyValue + "%"
                : "₹" + penaltyValue
            })`
          : "Daily collection created successfully",
        newCollection
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.createDailyCollectionByUserId = async (req, res) => {
  try {
    const { loan_detail_id, amount, collected_by, collected_officer_name } =
      req.body;

    const newCollection = new DailyCollectionModel({
      loan_detail_id,
      amount,
      collected_by,
      collected_officer_name,
    });

    await newCollection.save();

    res.json(
      successResponse(
        201,
        "Daily collection created successfully",
        newCollection
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getAllDailyCollections = async (req, res) => {
  try {
    const collections = await DailyCollectionModel.find()
      .populate("loan_detail_id", "loan_amount due_date")
      .populate("collected_by", "name")
      .populate("user_id", "full_name")
      .sort({ created_on: -1 })
      .lean();

    res.json(
      successResponse(
        200,
        "Daily collections fetched successfully",
        collections
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getDailyCollectionById = async (req, res) => {
  try {
    const collection = await DailyCollectionModel.find({
      user_id: req.params.id,
    })
      .populate("loan_detail_id", "loan_amount due_date")
      .populate("collected_by", "name")
      .lean();

    if (!collection) {
      return res
        .status(404)
        .json(errorResponse(404, "Daily collection not found"));
    }

    res.json(successResponse(200, "Daily collection found", collection));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.updateDailyCollection = async (req, res) => {
  try {
    const updatedCollection = await DailyCollectionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedCollection) {
      return res
        .status(404)
        .json(errorResponse(404, "Daily collection not found"));
    }

    res.json(
      successResponse(
        200,
        "Daily collection updated successfully",
        updatedCollection
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.deleteDailyCollection = async (req, res) => {
  try {
    const deletedCollection = await DailyCollectionModel.findByIdAndDelete(
      req.params.id
    ).lean();

    if (!deletedCollection) {
      return res
        .status(404)
        .json(errorResponse(404, "Daily collection not found"));
    }

    res.json(successResponse(200, "Daily collection deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.handleDailyCollectionByAdmin = async (req, res) => {
  try {
    const {
      addPenaltyFlag,
      penaltyType,
      penaltyValue,
      amount,
      collected_officer_code,
    } = req.body;
    const userId = req.params.id;

    if (!collected_officer_code) {
      return res
        .status(400)
        .json(errorResponse(400, "Collected officer code is required"));
    }

    // Officer find karo
    const officer = await OfficerModel.findOne({
      officer_code: collected_officer_code,
    });

    if (!officer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }

    // User find karo
    const user = await UserModel.findById(userId)
      .select("full_name phone_number account_type officer_id")
      .populate({
        path: "officer_id",
        select: "officer_code name",
      })
      .populate({
        path: "active_loan_id",
        select:
          "loan_amount principle_amount interest_rate total_due_amount total_penalty_amount",
      })
      .lean();

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const loanDetails = user.active_loan_id;

    if (officer.name !== "Admin Officer") {
      return res
        .status(403)
        .json(errorResponse(403, "Invalid Admin officer code"));
    }

    if (!loanDetails) {
      return res.status(404).json(errorResponse(404, "Loan detail not found"));
    }
    if (!loanDetails.total_due_amount) {
      return res
        .status(400)
        .json(errorResponse(400, "Loan amount is already paid"));
    }
    if (amount > loanDetails.total_due_amount) {
      return res
        .status(400)
        .json(errorResponse(400, "Collected amount exceeds total due amount"));
    }

    let updatedLoanDetail;
    let newCollection;
    let penaltyToAdd = 0;

    if (addPenaltyFlag) {
      if (penaltyType === "percentage") {
        penaltyToAdd =
          (Number(penaltyValue) / 100) * Number(loanDetails.total_due_amount);
      } else if (penaltyType === "amount") {
        penaltyToAdd = Number(penaltyValue);
      }

      updatedLoanDetail = await LoanDetailModel.findByIdAndUpdate(
        loanDetails._id,
        {
          total_due_amount:
            Number(loanDetails.total_due_amount ?? 0) + penaltyToAdd,
          total_penalty_amount:
            Number(loanDetails.total_penalty_amount ?? 0) + penaltyToAdd,
        },
        { new: true }
      ).lean();

      newCollection = new DailyCollectionModel({
        user_id: user._id,
        loan_detail_id: loanDetails._id,
        amount: 0,
        total_penalty_amount: updatedLoanDetail.total_penalty_amount,
        collected_by: officer._id,
        collected_officer_name: officer.name,
      });
    } else {
      updatedLoanDetail = await LoanDetailModel.findByIdAndUpdate(
        loanDetails._id,
        {
          total_penalty_amount: 0,
          total_due_amount: loanDetails.total_due_amount - amount,
        },
        { new: true }
      ).lean();

      newCollection = new DailyCollectionModel({
        user_id: user._id,
        loan_detail_id: loanDetails._id,
        amount,
        total_penalty_amount: updatedLoanDetail.total_penalty_amount,
        collected_by: officer._id,
        collected_officer_name: officer.name,
      });
    }

    await newCollection.save();

    // 🔹 Officer ke model me user ka record update karo
    const existingUser = officer.user_collections.find(
      (u) => u.user_id.toString() === user._id.toString()
    );

    if (existingUser) {
      existingUser.collected_amount =
        Number(existingUser.collected_amount || 0) +
        (addPenaltyFlag ? 0 : Number(amount));
      existingUser.penalty =
        Number(existingUser.penalty || 0) +
        (addPenaltyFlag ? Number(penaltyToAdd) : 0);
      existingUser.collected_on = new Date();
    } else {
      officer.user_collections.push({
        user_id: user._id,
        name: user.full_name,
        phone_number: user.phone_number,
        account_type: user.account_type,
        collected_amount: addPenaltyFlag ? 0 : Number(amount),
        penalty: addPenaltyFlag ? Number(penaltyToAdd) : 0,
        collected_on: new Date(),
      });
    }

    // 🟢 Officer ke totals update karo
    if (user.account_type === "loan account") {
      officer.totalLoanAmount =
        Number(officer.totalLoanAmount || 0) +
        (addPenaltyFlag ? 0 : Number(amount));
      officer.todayLoanAmount =
        Number(officer.todayLoanAmount || 0) +
        (addPenaltyFlag ? 0 : Number(amount));
    } else if (user.account_type === "saving account") {
      officer.totalSavingAmount =
        Number(officer.totalSavingAmount || 0) +
        (addPenaltyFlag ? 0 : Number(amount));
      officer.todaySavingAmount =
        Number(officer.todaySavingAmount || 0) +
        (addPenaltyFlag ? 0 : Number(amount));
    }

    // Global totals
    officer.total_collection =
      officer.totalLoanAmount + officer.totalSavingAmount;
    officer.todays_total_collection =
      officer.todayLoanAmount + officer.todaySavingAmount;

    await officer.save();

    return res.json(
      successResponse(
        201,
        addPenaltyFlag
          ? `Penalty applied (${
              penaltyType === "percentage"
                ? penaltyValue + "%"
                : "₹" + penaltyValue
            }) by admin`
          : "Daily collection created successfully by admin",
        newCollection
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};
