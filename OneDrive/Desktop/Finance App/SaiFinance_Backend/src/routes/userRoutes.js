const { Router } = require("express");
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  updateUserById,
  getUserProfile,
  deleteUser
} = require("../controllers/userControllers");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");

const userRouter = Router();

userRouter.get("/profile", authenticate, getUserProfile);
userRouter.get("/", authenticate, authorizeAdmin, getAllUsers);
userRouter.get("/:id", authenticate, authorizeAdmin, getUserDetails);
userRouter.put("/:id", authenticate, authorizeAdmin, updateUserById);
userRouter.delete("/:id", authenticate, authorizeAdmin, deleteUser);

// Note: Login is now handled by /api/auth/login
// Note: Registration is now handled by /api/auth/register

module.exports = userRouter;
