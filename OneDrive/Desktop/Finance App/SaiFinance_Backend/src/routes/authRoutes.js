const { Router } = require("express");
const { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword, 
  logout 
} = require("../controllers/authControllers");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeRoles } = require("../middlewares/authorization");

const authRouter = Router();

// Public routes (no authentication required)
authRouter.post("/register", register);
authRouter.post("/login", login);

// Protected routes (authentication required)
authRouter.get("/profile", authenticate, getProfile);
authRouter.put("/profile", authenticate, updateProfile);
authRouter.put("/change-password", authenticate, changePassword);
authRouter.post("/logout", authenticate, logout);

// Admin-only routes
authRouter.post("/register/admin", authenticate, authorizeRoles("admin"), register);

module.exports = authRouter;
