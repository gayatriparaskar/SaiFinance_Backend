const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeAdmin } = require("../middlewares/authorization");
const { getAllSavingAccount, getSavingAccountById, updateAccount, deleteAccount, getAllSavingUsers } = require("../controllers/savingAccountControllers");

const accountRouter = Router();

accountRouter.get("/allAccount", authenticate, authorizeAdmin,getAllSavingAccount);
accountRouter.get("/:id", authenticate, authorizeAdmin,getSavingAccountById);
accountRouter.put("/:id", authenticate, authorizeAdmin,updateAccount);
accountRouter.delete("/:id", authenticate, authorizeAdmin,deleteAccount);
accountRouter.get("/", authenticate, authorizeAdmin,getAllSavingUsers);

module.exports = accountRouter;