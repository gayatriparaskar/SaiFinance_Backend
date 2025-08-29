const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");
const {
  handleSavingDepositByAdmin,
  handleSavingWithdrawalByAdmin,
  totalDailyCollectionOfSavingForToday,
  getAccountStats,
  addMonthlyInterest,
  getAccountDailyCollectionById,
  getTotalSavingCollectionForDate,
  getTotalSavingCollectionForWeek,
  getTotalSavingCollectionForMonth,
  getTotalSavingCollectionForYear,
  getTotalSavingCollectionForEachMonth,
  getTotalSavingCollectionForWeekForEachDay,
} = require("../controllers/accountDailyCollectionControllers");

const savingDailyCollectionRouter = Router();

savingDailyCollectionRouter.post("/byAdmin/:id", authenticate, authorizeAdmin, handleSavingDepositByAdmin);
savingDailyCollectionRouter.post("/withdrawByAdmin/:id", authenticate, authorizeAdmin, handleSavingWithdrawalByAdmin);
savingDailyCollectionRouter.get("/totalSavingCollectionsToday", authenticate, authorizeAdmin, totalDailyCollectionOfSavingForToday);

// Get account stats
savingDailyCollectionRouter.get("/accountStats",authenticate, authorizeAdmin,getAccountStats)
savingDailyCollectionRouter.get("/totalSavingCollectionsToday", authenticate, authorizeAdmin, totalDailyCollectionOfSavingForToday);

// Add monthly interest
savingDailyCollectionRouter.put("/monthly-interest",authenticate, authorizeAdmin,addMonthlyInterest );
savingDailyCollectionRouter.get("/:id",authenticate,authorizeAdmin,getAccountDailyCollectionById);

// Get total collections by date
savingDailyCollectionRouter.get("/totalByDate", authenticate, authorizeAdmin, getTotalSavingCollectionForDate);
savingDailyCollectionRouter.get("/totalSavingCollectionsWeekly", authenticate, authorizeAdmin, getTotalSavingCollectionForWeek);
savingDailyCollectionRouter.get("/totalSavingCollectionsMonthly", authenticate, authorizeAdmin, getTotalSavingCollectionForMonth);
savingDailyCollectionRouter.get("/totalSavingCollectionsYearly", authenticate, authorizeAdmin, getTotalSavingCollectionForYear);
savingDailyCollectionRouter.get("/totalSavingCollectionsMonthlyStats", authenticate, authorizeAdmin, getTotalSavingCollectionForEachMonth);
savingDailyCollectionRouter.get("/totalSavingCollectionsWeeklyStats", authenticate, authorizeAdmin, getTotalSavingCollectionForWeekForEachDay);

module.exports = savingDailyCollectionRouter;
