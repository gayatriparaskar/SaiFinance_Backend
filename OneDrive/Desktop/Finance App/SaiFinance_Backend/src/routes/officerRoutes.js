const { Router } = require("express");
const OfficerModel = require("../models/officerModel");
const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");
const {
  createOfficer,
  getAllOfficers,
  getOfficerById,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/officerControllers");

const officerRouter = Router();

// Create a new officer
officerRouter.post("/", authenticate, checkRole("admin"), createOfficer);

// Get all officers
officerRouter.get("/", authenticate, checkRole("admin"), getAllOfficers);

// Get a single officer by ID
officerRouter.get("/:id", authenticate, checkRole("admin"), getOfficerById);

// Update an officer
officerRouter.put("/:id", authenticate, checkRole("admin"), updateOfficer);

// Delete an officer
officerRouter.delete("/:id", authenticate, checkRole("admin"), deleteOfficer);

module.exports = officerRouter;
