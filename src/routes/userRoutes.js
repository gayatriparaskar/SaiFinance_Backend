const { Router } = require("express");
const { userLogin, addNewUser } = require("../controllers/authControllers");
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  updateUserById,
  getUserProfile,
} = require("../controllers/userControllers");
const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");

const userRouter = Router();

userRouter.get("/profile", authenticate, getUserProfile);
userRouter.get("/", authenticate, checkRole("admin"), getAllUsers);
userRouter.get("/:id", authenticate, checkRole("admin"), getUserDetails);
userRouter.put("/:id", authenticate, checkRole("admin"), updateUserById);

// userRouter.put("/", authenticate, updateUser);

// userRouter.post("/register", addNewUser);
userRouter.post("/login", userLogin);
// userRouter.put("/profile", updateProfile);

module.exports = userRouter;
