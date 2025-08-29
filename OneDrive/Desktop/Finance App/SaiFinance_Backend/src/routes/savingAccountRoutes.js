const { Router } = require("express");
const {getAllSavingAccount,getSavingAccountById,updateAccount,deleteAccount,getAllSavingUsers} = require("../controllers/savingAccountControllers");

const { authenticate } = require("../middlewares/authenticate");
const { checkRole } = require("../middlewares/authorization");

const accountRouter = Router();

accountRouter.get("/allAccount", authenticate, checkRole("admin"),getAllSavingAccount);
accountRouter.get("/:id", authenticate, checkRole("admin"),getSavingAccountById);
accountRouter.put("/:id", authenticate, checkRole("admin"),updateAccount);
accountRouter.delete("/:id", authenticate, checkRole("admin"),deleteAccount);
accountRouter.get("/", authenticate, checkRole("admin"),getAllSavingUsers);


module.exports = accountRouter;