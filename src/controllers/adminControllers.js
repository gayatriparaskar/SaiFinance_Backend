const bcrypt = require("bcrypt");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const LoanDetailModel = require("../models/loanDetailModel");
const SavingModel = require("../models/savingaccountModel");
const UserModel = require("../models/userModel");
const DailyCollectionModel = require("../models/dailyCollectionModel");
const SavingDailyCollectionModel = require("../models/accountDailyCollectionModel");
const OfficerModel = require("../models/officerModel");
module.exports.getLoanStats = async (req, res) => {
  try {
    const totalUsers = await LoanDetailModel.distinct("user_id").then(
      (users) => users.length
    );

    const loan_amount = await LoanDetailModel.aggregate([
      { $group: { _id: null, total: { $sum: "$loan_amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    const total_amount = await LoanDetailModel.aggregate([
      { $group: { _id: null, total: { $sum: "$total_amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    const total_due_amount = await LoanDetailModel.aggregate([
      { $group: { _id: null, total: { $sum: "$total_due_amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    const stats = {
      totalUsers,
      loan_amount,
      total_amount,
      total_due_amount,
    };

    res.json(successResponse(200, "Fetch Total loan details", stats));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.addNewAccountUser = async (req, res) => {
  try {
    const { phone_number, pan_no, aadhar_no, Account_details, officer_id } = req.body;

    if (!phone_number) {
      return res
        .status(400)
        .json(errorResponse(400, "phone_number field is required"));
    }

    if (!officer_id) {
      return res
        .status(400)
        .json(errorResponse(400, "officer_id is required"));
    }

    if (!Account_details) {
      return res
        .status(400)
        .json(errorResponse(400, "Account_details is required"));
    }

    let existingUser = await UserModel.findOne({ phone_number });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(phone_number, SALT_ROUNDS);
      if (!hashedPassword) {
        return res
          .status(500)
          .json(errorResponse(500, "Password hashing failed"));
      }

      delete req.body.password;

      existingUser = new UserModel({
        ...req.body, 
        password: hashedPassword,
      });

      await existingUser.save();
    }

    const existingAccount = await SavingModel.findOne({
      $or: [{ aadhar_no }, { pan_no }],
    });

    if (existingAccount) {
      return res.status(400).json(
        errorResponse(
          400,
          "Account already exists with the provided Aadhar or PAN number"
        )
      );
    }

    const newAccount = new SavingModel({
      ...Account_details,
      user_id: existingUser._id,
      pan_no,
      aadhar_no,
    });

    await newAccount.save();


    existingUser.saving_account_id = newAccount._id;
    await existingUser.save();

    return res.status(201).json(
      successResponse(
        201,
        `${existingUser.full_name} has been registered successfully with _Id-${existingUser._id} and account number-${newAccount.account_number}`,
        existingUser
      )
    );
  } catch (error) {
    console.error("Error in addNewAccountUser:", error);
    return res
      .status(500)
      .json(errorResponse(500, error.message || "Internal server error"));
  }
};


module.exports.getTotalDailyCollection = async (req, res) => {
  try {
    const totalCount = await DailyCollectionModel.countDocuments();

    const totalAmount = await DailyCollectionModel.aggregate([
      { $group: { _id: null, totalCollection: { $sum: "$amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      totalCount,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        "Total daily collection retrieved successfully",
        stats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getTotalCollectionByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json(errorResponse(400, "Date is required"));
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const totalCount = await DailyCollectionModel.countDocuments({
      created_on: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalAmount = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalCollection: { $sum: "$amount" },
        },
      },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      date,
      totalCount,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection for ${date} retrieved successfully`,
        stats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getTotalCollectionForToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Loan Collection
    const totalLoanCount = await DailyCollectionModel.countDocuments({
      created_on: { $gte: today, $lte: endOfDay },
    });

    const totalLoanAmount = await DailyCollectionModel.aggregate([
      { $match: { created_on: { $gte: today, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    // Saving Collection (Deposit)
    const totalSavingCount = await SavingDailyCollectionModel.countDocuments({
      created_on: { $gte: today, $lte: endOfDay },
    });

    const totalSavingDeposit = await SavingDailyCollectionModel.aggregate([
      { $match: { created_on: { $gte: today, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: "$deposit_amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    // Saving Collection (Withdraw) -> optional
    const totalSavingWithdraw = await SavingDailyCollectionModel.aggregate([
      { $match: { created_on: { $gte: today, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: "$withdraw_amount" } } },
    ]).then((result) => (result.length > 0 ? result[0].total : 0));

    const stats = {
      date: today.toDateString(),
      loan: {
        count: totalLoanCount,
        amount: totalLoanAmount,
      },
      saving: {
        count: totalSavingCount,
        deposit: totalSavingDeposit,
        withdraw: totalSavingWithdraw,
        net: totalSavingDeposit - totalSavingWithdraw,
      },
      grandTotal: totalLoanAmount + totalSavingDeposit - totalSavingWithdraw,
    };

    res.json(
      successResponse(200, "Total daily collection (Loan + Saving) retrieved successfully", stats)
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};


module.exports.getTotalCollectionForWeek = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    const totalCount = await DailyCollectionModel.countDocuments({
      created_on: { $gte: startOfWeek, $lte: today },
    });

    const totalAmount = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfWeek, $lte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalCollection: { $sum: "$amount" },
        },
      },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      startDate: startOfWeek.toDateString(),
      endDate: today.toDateString(),
      totalCount,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection for the last 7 days retrieved successfully`,
        stats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getTotalCollectionForMonth = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startOfMonth = new Date();
    startOfMonth.setDate(startOfMonth.getDate() - today.getDate() + 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const totalCount = await DailyCollectionModel.countDocuments({
      created_on: { $gte: startOfMonth, $lte: today },
    });

    const totalAmount = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfMonth, $lte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalCollection: { $sum: "$amount" },
        },
      },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      startDate: startOfMonth.toDateString(),
      endDate: today.toDateString(),
      totalCount,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection for the ${new Date().toLocaleString("default", {
          month: "long",
        })} month retrieved successfully`,stats)
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.getTotalCollectionForYear = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    
    const startOfYear = new Date(today.getFullYear(), 0, 1); 
    startOfYear.setHours(0, 0, 0, 0);

    const totalCount = await DailyCollectionModel.countDocuments({
      created_on: { $gte: startOfYear, $lte: today },
    });

    const totalAmount = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfYear, $lte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalCollection: { $sum: "$amount" },
        },
      },
    ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

    const stats = {
      startDate: startOfYear.toDateString(),
      endDate: today.toDateString(),
      totalCount,
      totalAmount,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection for the year ${today.getFullYear()} retrieved successfully`,
        stats
      )
    );
  } catch(error){
    console.log(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};

// module.exports.getTotalCollectionForEachMonth = async (req, res) => {
//   try {
//     const today = new Date();
//     const currentYear = today.getFullYear();

//     let monthlyStats = [];

//     for (let month = 0; month < 12; month++) {

//       const startOfMonth = new Date(currentYear, month, 1, 0, 0, 0, 0);
//       const endOfMonth = new Date(currentYear, month + 1, 0, 23, 59, 59, 999);


//       const totalLoanCount = await DailyCollectionModel.countDocuments({
//         created_on: { $gte: startOfMonth, $lte: endOfMonth },
//       });
//       const totalSavingCount = await SavingDailyCollectionModel.countDocuments({
//         created_on: { $gte: startOfMonth, $lte: endOfMonth },
//       });

//       const totalLoanAmount = await DailyCollectionModel.aggregate([
//         {
//           $match: {
//             created_on: { $gte: startOfMonth, $lte: endOfMonth },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalCollection: { $sum: "$amount" },
//           },
//         },
//       ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

//       const totalSavingAmount = await SavingDailyCollectionModel.aggregate([
//         {
//           $match: {
//             created_on: { $gte: startOfMonth, $lte: endOfMonth },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalCollection: { $sum: "$deposit_amount" },
//           },
//         },
//       ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));
//       monthlyStats.push({
//         month: new Date(currentYear, month, 1).toLocaleString("default", {
//           month: "long",
//         }), 
//         totalLoanCount,
//         totalLoanAmount,
//         totalSavingCount,
//         totalSavingAmount
//       });
//     }

//     res.json(
//       successResponse(200, `Monthly collection stats for ${currentYear} retrieved successfully`, monthlyStats)
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(errorResponse(500, error.message));
//   }
// };
module.exports.getTotalCollectionForEachMonth = async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear();


    const loanStats = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$created_on" } },
          totalLoanAmount: { $sum: "$amount" },
          totalLoanCount: { $sum: 1 },
        },
      },
    ]);

    const savingStats = await SavingDailyCollectionModel.aggregate([
      {
        $match: {
          created_on: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$created_on" } },
          totalSavingAmount: { $sum: "$deposit_amount" },
          totalSavingCount: { $sum: 1 },
        },
      },
    ]);


    const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(currentYear, i, 1).toLocaleString("default", {
        month: "long",
      }),
      totalLoanCount: 0,
      totalLoanAmount: 0,
      totalSavingCount: 0,
      totalSavingAmount: 0,
    }));


    loanStats.forEach((item) => {
      const index = item._id.month - 1;
      monthlyStats[index].totalLoanAmount = item.totalLoanAmount;
      monthlyStats[index].totalLoanCount = item.totalLoanCount;
    });


    savingStats.forEach((item) => {
      const index = item._id.month - 1;
      monthlyStats[index].totalSavingAmount = item.totalSavingAmount;
      monthlyStats[index].totalSavingCount = item.totalSavingCount;
    });

    res.json(
      successResponse(
        200,
        `Monthly collection stats for ${currentYear} retrieved successfully`,
        monthlyStats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};      

// module.exports.getTotalCollectionForWeekForEachDay = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(23, 59, 59, 999);

//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - today.getDay() + 1); 
//     startOfWeek.setHours(0, 0, 0, 0);

//     let dailyStats = [];
    
//     for (let i = 0; i < 7; i++) {
//       const day = new Date(startOfWeek);
//       day.setDate(startOfWeek.getDate() + i);

//       const startOfDay = new Date(day);
//       startOfDay.setHours(0, 0, 0, 0);
//       const endOfDay = new Date(day);
//       endOfDay.setHours(23, 59, 59, 999);

//       const dailyLoanCount = await DailyCollectionModel.countDocuments({
//         created_on: { $gte: startOfDay, $lte: endOfDay },
//       });

//       const dailyLoanAmount = await DailyCollectionModel.aggregate([
//         {
//           $match: {
//             created_on: { $gte: startOfDay, $lte: endOfDay },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalCollection: { $sum: "$amount" },
//           },
//         },
//       ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

//       const dailySavingCount = await SavingDailyCollectionModel.countDocuments({
//         created_on: { $gte: startOfDay, $lte: endOfDay },
//       });

//       const dailySavingAmount = await SavingDailyCollectionModel.aggregate([
//         {
//           $match: {
//             created_on: { $gte: startOfDay, $lte: endOfDay },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             totalCollection: { $sum: "$deposit_amount" },
//           },
//         },
//       ]).then((result) => (result.length > 0 ? result[0].totalCollection : 0));

//       dailyStats.push({
//         day: startOfDay.toLocaleString("default", { weekday: "long" }), 
//         totalLoanCount: dailyLoanCount,
//         totalLoanAmount: dailyLoanAmount,
//         totalSavingCount: dailySavingCount,
//         totalSavingAmount: dailySavingAmount,
//       });
//     }

//     const stats = {
//       startDate: startOfWeek.toDateString(),
//       endDate: today.toDateString(),
//       dailyStats,
//     };

//     res.json(
//       successResponse(
//         200,
//         `Total daily collection stats for the current week retrieved successfully`,
//         stats
//       )
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(errorResponse(500, error.message));
//   }
// };

module.exports.getTotalCollectionForWeekForEachDay = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const loanStats = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfWeek, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: { format: "%Y-%m-%d", date: "$created_on" },
            },
          },
          totalLoanCount: { $sum: 1 },
          totalLoanAmount: { $sum: "$amount" },
        },
      },
    ]);

    const savingStats = await SavingDailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: startOfWeek, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: { format: "%Y-%m-%d", date: "$created_on" },
            },
          },
          totalSavingCount: { $sum: 1 },
          totalSavingAmount: { $sum: "$deposit_amount" },
        },
      },
    ]);

    const dailyStats = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const dayString = day.toISOString().split("T")[0];

      const loan = loanStats.find((item) => item._id.day === dayString) || {
        totalLoanCount: 0,
        totalLoanAmount: 0,
      };

      const saving = savingStats.find((item) => item._id.day === dayString) || {
        totalSavingCount: 0,
        totalSavingAmount: 0,
      };

      dailyStats.push({
        day: day.toLocaleString("default", { weekday: "long" }),
        totalLoanCount: loan.totalLoanCount,
        totalLoanAmount: loan.totalLoanAmount,
        totalSavingCount: saving.totalSavingCount,
        totalSavingAmount: saving.totalSavingAmount,
      });
    }

    const stats = {
      startDate: startOfWeek.toDateString(),
      endDate: today.toDateString(),
      dailyStats,
    };

    res.json(
      successResponse(
        200,
        `Total daily collection stats for the current week retrieved successfully`,
        stats
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(500, error.message));
  }
};


module.exports.getTodayOfficerSummary = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start);
    end.setDate(end.getDate() + 1);


    const allOfficers = await OfficerModel.find().lean();

    const loanData = await DailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: "$collected_by",
          total_loan_amount: { $sum: "$amount" },
          total_penalty: { $sum: { $ifNull: ["$total_penalty_amount", 0] } }
        }
      }
    ]);

    const savingData = await SavingDailyCollectionModel.aggregate([
      {
        $match: {
          created_on: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: "$collected_by",
          total_saving_deposit: { $sum: "$deposit_amount" }
        }
      }
    ]);

    const loanMap = new Map();
    loanData.forEach(item => {
      loanMap.set(item._id.toString(), item);
    });

    const savingMap = new Map();
    savingData.forEach(item => {
      savingMap.set(item._id.toString(), item);
    });

    const finalData = allOfficers.map(officer => {
      const idStr = officer._id.toString();
      const loan = loanMap.get(idStr) || {};
      const saving = savingMap.get(idStr) || {};

      const total_loan_amount = loan.total_loan_amount || 0;
      const total_penalty = loan.total_penalty || 0;
      const total_saving_deposit = saving.total_saving_deposit || 0;

      return {
        officer_id: officer._id,
        officer_name: officer.name,
        officer_code: officer.officer_code,
        total_loan_amount,
        total_penalty,
        total_saving_deposit,
        total_collection: total_loan_amount + total_penalty + total_saving_deposit,
      };
    });

    res.status(200).json({
      message: "Today's summary fetched successfully",
      date: start.toISOString().split("T")[0],
      data: finalData,
    });
  } catch (error) {
    console.error("Error in getTodayOfficerSummary:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

