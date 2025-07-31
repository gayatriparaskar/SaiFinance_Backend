const { Router } = require("express");
const { handleSavingDeposit ,handleSavingDepositByAdmin,handleSavingWithdrawalByAdmin,getAccountStats,totalDailyCollectionOfSavingForToday,addMonthlyInterest,getAccountDailyCollectionById} = require("../controllers/accountDailyCollectionControllers");

const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");

const savingDailyCollectionRouter = Router();


savingDailyCollectionRouter.post("/", authenticate, handleSavingDeposit);
savingDailyCollectionRouter.post("/byAdmin/:id", authenticate, checkRole("admin"), handleSavingDepositByAdmin);
savingDailyCollectionRouter.post("/withdrawByAdmin/:id", authenticate, checkRole("admin"), handleSavingWithdrawalByAdmin);

savingDailyCollectionRouter.get("/accountStats",authenticate, checkRole("admin"),getAccountStats)
savingDailyCollectionRouter.get("/totalSavingCollectionsToday", authenticate, checkRole("admin"), totalDailyCollectionOfSavingForToday);

savingDailyCollectionRouter.put("/monthly-interest",authenticate, checkRole("admin"),addMonthlyInterest );
savingDailyCollectionRouter.get("/:id",authenticate,checkRole("admin"),getAccountDailyCollectionById);



module.exports = savingDailyCollectionRouter;
