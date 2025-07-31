const express = require("express");
const cors = require("cors");
const connection = require("./src/configs/db");
const { errorResponse } = require("./src/helpers/successAndError");
const userRouter = require("./src/routes/userRoutes");
const adminRouter = require("./src/routes/adminRoutes");
const officerRouter = require("./src/routes/officerRoutes");
const dailyCollectionRouter = require("./src/routes/dailyCollectionRoutes");
const accountRouter = require("./src/routes/savingAccountRoutes");
const savingDailyCollectionRouter = require("./src/routes/accountDailyCollectionRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
// Home route
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: "Hello from the server",
      message: "Server is running perfectly fine",
    });
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(500, "Internal server error at home route", error.message)
      );
  }
});

app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/officers", officerRouter);
app.use("/api/dailyCollections", dailyCollectionRouter);
app.use("/api/account", accountRouter);
app.use("/api/savingDailyCollections", savingDailyCollectionRouter);

app.use("/health-check", (req, res) => {
  res.status(200).send({ success: true, message: "Checking health..." });
});

// Start the server
app.listen(PORT, async () => {
  try {
    // Establish database connection
    await connection;

    // Server listening message
    console.log({ message: `Server is listening on port ${PORT}` });
  } catch (error) {
    console.log(error.message);
  }
});
