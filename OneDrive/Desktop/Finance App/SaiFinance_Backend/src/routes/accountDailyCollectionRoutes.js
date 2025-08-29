const { Router } = require("express");

const { handleSavingDeposit ,handleSavingDepositByAdmin,handleSavingWithdrawalByAdmin,getAccountStats,totalDailyCollectionOfSavingForToday,addMonthlyInterest,getAccountDailyCollectionById,getAllSavingCollections,getTotalSavingCollectionForDate,getTotalSavingCollectionForWeek,getTotalSavingCollectionForMonth,getTotalSavingCollectionForYear,getTotalSavingCollectionForEachMonth,getTotalSavingCollectionForWeekForEachDay} = require("../controllers/accountDailyCollectionControllers");


const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");

const savingDailyCollectionRouter = Router();


savingDailyCollectionRouter.post("/", authenticate, handleSavingDeposit);
savingDailyCollectionRouter.get("/getAllSavings", authenticate, getAllSavingCollections);
savingDailyCollectionRouter.post("/byAdmin/:id", authenticate, checkRole("admin"), handleSavingDepositByAdmin);
savingDailyCollectionRouter.post("/withdrawByAdmin/:id", authenticate, checkRole("admin"), handleSavingWithdrawalByAdmin);
savingDailyCollectionRouter.get("/totalSavingCollectionsToday", authenticate, checkRole("admin"), totalDailyCollectionOfSavingForToday);


savingDailyCollectionRouter.get("/accountStats",authenticate, checkRole("admin"),getAccountStats)
savingDailyCollectionRouter.get("/totalSavingCollectionsToday", authenticate, checkRole("admin"), totalDailyCollectionOfSavingForToday);

savingDailyCollectionRouter.put("/monthly-interest",authenticate, checkRole("admin"),addMonthlyInterest );
savingDailyCollectionRouter.get("/:id",authenticate,checkRole("admin"),getAccountDailyCollectionById);

savingDailyCollectionRouter.get("/totalByDate", authenticate, checkRole("admin"), getTotalSavingCollectionForDate);
savingDailyCollectionRouter.get("/totalSavingCollectionsWeekly", authenticate, checkRole("admin"), getTotalSavingCollectionForWeek);
savingDailyCollectionRouter.get("/totalSavingCollectionsMonthly", authenticate, checkRole("admin"), getTotalSavingCollectionForMonth);
savingDailyCollectionRouter.get("/totalSavingCollectionsYearly", authenticate, checkRole("admin"), getTotalSavingCollectionForYear);
savingDailyCollectionRouter.get("/totalSavingCollectionsMonthlyStats", authenticate, checkRole("admin"), getTotalSavingCollectionForEachMonth);
savingDailyCollectionRouter.get("/totalSavingCollectionsWeeklyStats", authenticate, checkRole("admin"), getTotalSavingCollectionForWeekForEachDay);




module.exports = savingDailyCollectionRouter;
