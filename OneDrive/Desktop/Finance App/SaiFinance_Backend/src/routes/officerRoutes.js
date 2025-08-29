const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");
const {
  createOfficer,
  getAllOfficers,
  getOfficerById,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/officerControllers");

const officerRouter = Router();

// Create a new officer
officerRouter.post("/", authenticate, authorizeAdmin, createOfficer);

// Get all officers
officerRouter.get("/", authenticate, authorizeAdmin, getAllOfficers);

// Get officer by ID
officerRouter.get("/:id", authenticate, authorizeAdmin, getOfficerById);

// Update officer
officerRouter.put("/:id", authenticate, authorizeAdmin, updateOfficer);

// Delete officer
officerRouter.delete("/:id", authenticate, authorizeAdmin, deleteOfficer);

module.exports = officerRouter;
