const {
    errorResponse,
    successResponse,
 } = require("../helpers/successAndError");

const SavingDailyCollectionModel = require("../models/accountDailyCollectionModel");
const OfficerModel = require("../models/officerModel");
const UserModel = require("../models/userModel");
const SavingModel = require("../models/savingaccountModel");

module.exports.handleSavingDeposit = async (req, res) => {
  try {
    const { deposit_amount, collected_officer_id, collected_officer_code } = req.body;

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
        path: "saving_account_id",
        select: "current_amount interest_rate created_on interest_payed last_interest_applied_on",
      })
      .lean();

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const savingAccount = user.saving_account_id;
    let collectingOfficer = user.officer_id;

    if (collected_officer_id) {
      collectingOfficer = await OfficerModel.findById(collected_officer_id)
        .lean()
        .select("officer_code name");
    }

    if (!savingAccount) {
      return res.status(404).json(errorResponse(404, "Saving account not found"));
    }

    if (collectingOfficer.officer_code !== collected_officer_code) {
      return res.status(403).json(errorResponse(403, "Invalid officer code"));
    }

    const updatedSavingAccount = await SavingModel.findByIdAndUpdate(
      savingAccount._id,
      { $inc: { current_amount: deposit_amount } },
      { new: true }
    ).lean();


    const newCollection = new SavingDailyCollectionModel({
      user_id: user._id,
      saving_account_id: savingAccount._id,
      deposit_amount,
      collected_by: collectingOfficer._id,
      collected_officer_name: collectingOfficer.name,
    });

    await newCollection.save();


    const account = await SavingModel.findById(savingAccount._id);

    const lastAppliedDate = account.last_interest_applied_on || account.created_on;
    const now = new Date();

    const fourMonthsLater = new Date(lastAppliedDate);
    fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);

    if (now >= fourMonthsLater) {
      const interestRate = parseFloat(account.interest_rate); 
      const currentAmount = account.current_amount;

      const interest = (currentAmount * interestRate * (4 / 12)) / 100; 

      account.current_amount += interest;
      account.interest_payed = (account.interest_payed || 0) + interest;
      account.last_interest_applied_on = new Date();

      await account.save();
    }

    return res.json(successResponse(201, "Deposit successful", newCollection));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};


module.exports.handleSavingDepositByAdmin = async (req, res) => {
  try {
    const { deposit_amount, collected_officer_id, collected_officer_code } = req.body;
    const userId = req.params.id; 

    if (!collected_officer_code) {
      return res
        .status(400)
        .json(errorResponse(400, "Collected officer code is required"));
    }

    const user = await UserModel.findById(userId)
      .select("officer_id saving_account_id")
      .populate({
        path: "saving_account_id",
        select: "current_amount",
      })
      .lean();

    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    const savingAccount = user.saving_account_id;

    if (!savingAccount) {
      return res.status(404).json(errorResponse(404, "Saving account not found"));
    }

    let collectingOfficer = await OfficerModel.findOne({ officer_code: collected_officer_code })
      .lean()
      .select("officer_code name");
    
      

    if (!collectingOfficer) {
      return res.status(404).json(errorResponse(404, "Officer not found"));
    }

    if (collected_officer_id && collected_officer_id !== collectingOfficer._id.toString()) {
      return res.status(403).json(errorResponse(403, "Collected officer ID does not match the officer code"));
    }

    
    if (collectingOfficer.name !== "Admin Officer") {
      return res.status(403).json(errorResponse(403, "Invalid Admin officer code"));
    }


    const updatedSavingAccount = await SavingModel.findByIdAndUpdate(
      savingAccount._id,
      { $inc: { current_amount: deposit_amount } },
      { new: true }
    ).lean();

 
    const newCollection = new SavingDailyCollectionModel({
      user_id: user._id,
      saving_account_id: savingAccount._id,
      deposit_amount,
      collected_by: collectingOfficer._id,
      collected_officer_name: collectingOfficer.name,
    });
    await newCollection.save();

    const account = await SavingModel.findById(savingAccount._id);

    const lastAppliedDate = account.last_interest_applied_on || account.created_on;
    const now = new Date();

    const fourMonthsLater = new Date(lastAppliedDate);
    fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);

    if (now >= fourMonthsLater) {
      const interestRate = parseFloat(account.interest_rate); 
      const currentAmount = account.current_amount;

      const interest = (currentAmount * interestRate * (4 / 12)) / 100; 

      account.current_amount += interest;
      account.interest_payed = (account.interest_payed || 0) + interest;
      account.last_interest_applied_on = new Date();

      await account.save();
    }

    return res.json(successResponse(201, "Deposit successful", newCollection));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.handleSavingWithdrawalByAdmin = async (req, res) => {
    try {
      const { withdraw_amount, collected_officer_id, collected_officer_code } = req.body;
      const userId = req.params.id;
  
      if (!collected_officer_code) {
        return res.status(400).json(errorResponse(400, "Collected officer code is required"));
      }
  
      if (!withdraw_amount || withdraw_amount <= 0) {
        return res.status(400).json(errorResponse(400, "Invalid withdrawal amount"));
      }
  
      const user = await UserModel.findById(userId)
        .select("saving_account_id")
        .populate({
          path: "saving_account_id",
          select: "current_amount daily_withdrawal_limit total_withdrawal",
        })
        .lean();
  
      if (!user) {
        return res.status(404).json(errorResponse(404, "User not found"));
      }
  
      const savingAccount = user.saving_account_id;
      if (!savingAccount) {
        return res.status(404).json(errorResponse(404, "Saving account not found"));
      }
  
      let collectingOfficer = await OfficerModel.findOne({ officer_code: collected_officer_code })
        .lean()
        .select("officer_code name");
  
      if (!collectingOfficer) {
        return res.status(404).json(errorResponse(404, "Officer not found"));
      }
  
  
      if (withdraw_amount > savingAccount.current_amount) {
        return res.status(400).json(errorResponse(400, "Insufficient balance"));
      }
  
      if (withdraw_amount > savingAccount.daily_withdrawal_limit) {
        return res.status(400).json(errorResponse(400, "Exceeds daily withdrawal limit"));
      }

      if (collectingOfficer.name !== "Admin Officer") {
        return res.status(403).json(errorResponse(403, "Invalid Admin officer code"));
      }
  

      const updatedSavingAccount = await SavingModel.findByIdAndUpdate(
        savingAccount._id,
        {
          $inc: {
            current_amount: -withdraw_amount,
            total_withdrawal: withdraw_amount,
          },
        },
        { new: true }
      ).lean();
  

      const newWithdrawalRecord = new SavingDailyCollectionModel({
        user_id: user._id,
        saving_account_id: savingAccount._id,
        withdraw_amount,
        collected_by: collectingOfficer._id,
        collected_officer_name: collectingOfficer.name,

      });
  
      await newWithdrawalRecord.save();
  
      return res.json(successResponse(201, "Withdrawal successful by admin", newWithdrawalRecord));
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse(500, error.message));
    }
  };
  

module.exports.getAccountStats = async (req, res) => {
  try {

    const totalUsers = await SavingModel.distinct("user_id").then(users => users.length);


    const totalAmount = await SavingModel.aggregate([
      { $group: { _id: null, total: { $sum: "$current_amount" } } }
    ]).then(result => (result.length > 0 ? result[0].total : 0));


    const stats = {
      totalUsers,
      totalAmount
    };

    res.json(successResponse(200, "Fetched Saving Account Stats", stats));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.totalDailyCollectionOfSavingForToday = async(req,res)=>{
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalCountOfSavingCollection = await SavingDailyCollectionModel.countDocuments({
      created_on: { $gte: today, $lte: endOfDay },
    });

    const totalAmount = await SavingDailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: today, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalCollection: { $sum: "$deposit_amount" },
        },
      },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      date: today.toDateString(),
      totalCountOfSavingCollection,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection of Saving Account for today retrieved successfully`,
        stats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
}


module.exports.addMonthlyInterest = async (req, res) => {
  try {
    const today = new Date();

    const accounts = await SavingModel.find({
      is_active: true,
      is_deleted: false,
    });

    if (accounts.length === 0) {
      return res.status(200).json({ message: "No active saving accounts found" });
    }

    let updatedAccounts = [];

    for (let account of accounts) {
      const interestRate = parseFloat(account.interest_rate); 
      const currentAmount = account.current_amount;

      const lastInterestDate = account.last_interest_applied_on || account.created_on;


      const nextInterestDate = new Date(lastInterestDate);
      nextInterestDate.setMonth(nextInterestDate.getMonth() + 1);

      if (today >= nextInterestDate) {
        const interest = (currentAmount * interestRate * (1 / 12)) / 100;

        account.current_amount += interest;
        account.interest_payed += interest;
        account.last_interest_applied_on = today;

        await account.save();

        updatedAccounts.push({
          account_number: account.account_number,
          interestAdded: interest.toFixed(2),
          newBalance: account.current_amount.toFixed(2),
        });
      }
    }

    res.status(200).json({
      message: "Monthly interest added to eligible accounts",
      updatedAccounts,
    });
  } catch (error) {
    console.error("Error in addMonthlyInterest:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports.getAccountDailyCollectionById = async (req, res) => {
  try {
    const collection = await SavingDailyCollectionModel.find({
      user_id: req.params.id,
    }).lean().sort({ created_on: -1 });

    if (!collection) {
      return res
        .status(404)
        .json(errorResponse(404, "Account Daily collection not found"));
    }

    res.json(successResponse(200, "Account Daily collection found", collection));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

