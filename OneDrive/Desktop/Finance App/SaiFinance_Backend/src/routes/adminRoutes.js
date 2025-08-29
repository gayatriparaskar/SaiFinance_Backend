const { Router } = require("express");
const { addNewUser, adminLogin } = require("../controllers/authControllers");
const { getLoanStats,addNewAccountUser ,getTotalDailyCollection ,getTotalCollectionByDate,getTotalCollectionForToday,getTotalCollectionForWeek,getTotalCollectionForMonth,getTotalCollectionForYear,getTotalCollectionForEachMonth,getTotalCollectionForWeekForEachDay,getTodayOfficerSummary} = require("../controllers/adminControllers");
const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");
const { getUserDetails } = require("../controllers/userControllers");

const adminRouter = Router();

// adminRouter.get("/", async (req, res) => {
//   //   const pingResponse = await subscriberTwo.ping();
//   res.send(`Redis connection is ${"pingResponse"}`);
// });

adminRouter.post("/createUser", authenticate, checkRole("admin"), addNewUser);

adminRouter.get("/totalLoanDetails", authenticate, checkRole("admin"), getLoanStats)
adminRouter.post("/createAccountUser", authenticate, checkRole("admin"), addNewAccountUser);
adminRouter.get("/totalCollections", authenticate, checkRole("admin"), getTotalDailyCollection);
adminRouter.get("/totalByDate", authenticate, checkRole("admin"), getTotalCollectionByDate);
adminRouter.get("/totalCollectionsToday", authenticate, checkRole("admin"), getTotalCollectionForToday);
adminRouter.get("/totalCollectionsWeekly", authenticate, checkRole("admin"), getTotalCollectionForWeek);
adminRouter.get("/totalCollectionsMonthly", authenticate, checkRole("admin"), getTotalCollectionForMonth);
adminRouter.get("/totalCollectionsYearly", authenticate, checkRole("admin"), getTotalCollectionForYear);
adminRouter.get("/totalCollectionsMonthlyStats", authenticate, checkRole("admin"), getTotalCollectionForEachMonth);
adminRouter.get("/totalCollectionsWeeklyStats", authenticate, checkRole("admin"), getTotalCollectionForWeekForEachDay);
adminRouter.get("/todayOfficerSummary", authenticate, checkRole("admin"), getTodayOfficerSummary);

adminRouter.post("/login", adminLogin);
// userRouter.get("/profile", getProfile);
// userRouter.put("/profile", updateProfile);

module.exports = adminRouter;
