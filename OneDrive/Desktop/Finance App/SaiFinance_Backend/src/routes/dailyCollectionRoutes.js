const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");
const {
  handleDailyCollection,
  handleDailyCollectionByAdmin,
  getAllDailyCollections,
  getDailyCollectionById,
  updateDailyCollection,
  deleteDailyCollection,
  getDailyCollectionByDate,
  getDailyCollectionByOfficer,
  getDailyCollectionByDateRange,
  getDailyCollectionStats,
} = require("../controllers/dailyCollectionControllers");

const dailyCollectionRouter = Router();

// Handle daily collection by officer
dailyCollectionRouter.post("/", authenticate, handleDailyCollection);

// Handle daily collection by admin
dailyCollectionRouter.post("/byAdmin/:id", authenticate, authorizeAdmin, handleDailyCollectionByAdmin);

// Get all daily collections
dailyCollectionRouter.get(
  "/",
  authenticate,
  authorizeAdmin,
  getAllDailyCollections
);

// Get daily collection by ID
dailyCollectionRouter.get(
  "/:id",
  authenticate,
  authorizeAdmin,
  getDailyCollectionById
);

// Update daily collection
dailyCollectionRouter.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateDailyCollection
);

// Delete daily collection
dailyCollectionRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteDailyCollection
);

module.exports = dailyCollectionRouter;
