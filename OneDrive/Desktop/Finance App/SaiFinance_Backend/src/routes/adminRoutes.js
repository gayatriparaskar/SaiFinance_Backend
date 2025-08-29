const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");
const { register } = require("../controllers/authControllers");
const {
  addNewAccountUser,
  getLoanStats,
  getTotalDailyCollection,
  getTotalCollectionByDate,
  getTotalCollectionForToday,
  getTotalCollectionForWeek,
  getTotalCollectionForMonth,
  getTotalCollectionForYear,
  getTotalCollectionForEachMonth,
  getTotalCollectionForWeekForEachDay,
  getTodayOfficerSummary,
} = require("../controllers/adminControllers");

const adminRouter = Router();

// Create new user (admin only)
adminRouter.post("/createUser", authenticate, authorizeAdmin, register);

adminRouter.get("/totalLoanDetails", authenticate, authorizeAdmin, getLoanStats)
adminRouter.post("/createAccountUser", authenticate, authorizeAdmin, addNewAccountUser);
adminRouter.get("/totalCollections", authenticate, authorizeAdmin, getTotalDailyCollection);
adminRouter.get("/totalByDate", authenticate, authorizeAdmin, getTotalCollectionByDate);
adminRouter.get("/totalCollectionsToday", authenticate, authorizeAdmin, getTotalCollectionForToday);
adminRouter.get("/totalCollectionsWeekly", authenticate, authorizeAdmin, getTotalCollectionForWeek);
adminRouter.get("/totalCollectionsMonthly", authenticate, authorizeAdmin, getTotalCollectionForMonth);
adminRouter.get("/totalCollectionsYearly", authenticate, authorizeAdmin, getTotalCollectionForYear);
adminRouter.get("/totalCollectionsMonthlyStats", authenticate, authorizeAdmin, getTotalCollectionForEachMonth);
adminRouter.get("/totalCollectionsWeeklyStats", authenticate, authorizeAdmin, getTotalCollectionForWeekForEachDay);
adminRouter.get("/todayOfficerSummary", authenticate, authorizeAdmin, getTodayOfficerSummary);

module.exports = adminRouter;
