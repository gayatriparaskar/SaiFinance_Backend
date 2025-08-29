const { Router } = require("express");
const {
  // createDailyCollection,
  // addPanlty,
  handleDailyCollection,
  getAllDailyCollections,
  getDailyCollectionById,
  updateDailyCollection,
  deleteDailyCollection,
  handleDailyCollectionByAdmin,
  
} = require("../controllers/dailyCollectionControllers");

const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");

const dailyCollectionRouter = Router();

// dailyCollectionRouter.post("/", authenticate, createDailyCollection);
// dailyCollectionRouter.post("/",authenticate, addPanlty)
// dailyCollectionRouter.post("/:id", createDailyCollection);

dailyCollectionRouter.post("/", authenticate, handleDailyCollection);
dailyCollectionRouter.post("/byAdmin/:id", authenticate, checkRole("admin"), handleDailyCollectionByAdmin);

dailyCollectionRouter.get(
  "/",
  authenticate,
  checkRole("admin"),
  getAllDailyCollections
);
dailyCollectionRouter.get(
  "/:id",
  authenticate,
  checkRole("admin"),
  getDailyCollectionById
);
dailyCollectionRouter.put(
  "/:id",
  authenticate,
  checkRole("admin"),
  updateDailyCollection
);
dailyCollectionRouter.delete(
  "/:id",
  authenticate,
  checkRole("admin"),
  deleteDailyCollection
);

module.exports = dailyCollectionRouter;
