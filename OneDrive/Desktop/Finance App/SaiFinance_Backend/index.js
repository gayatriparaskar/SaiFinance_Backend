const express = require("express");
const cors = require("cors");
const connection = require("./src/configs/db");
const { errorResponse } = require("./src/helpers/successAndError");

// Import routes
const userRouter = require("./src/routes/userRoutes");
const adminRouter = require("./src/routes/adminRoutes");
const officerRouter = require("./src/routes/officerRoutes");
const dailyCollectionRouter = require("./src/routes/dailyCollectionRoutes");
const accountRouter = require("./src/routes/savingAccountRoutes");
const savingDailyCollectionRouter = require("./src/routes/accountDailyCollectionRoutes");

// Import new authentication and role-based routes
const authRouter = require("./src/routes/authRoutes");
const roleBasedRouter = require("./src/routes/roleBasedRoutes");

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
      version: "2.0.0",
      features: [
        "Role-based authentication system",
        "JWT token authentication",
        "Role-based access control",
        "User management",
        "Financial operations"
      ]
    });
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(500, "Internal server error at home route", error.message)
      );
  }
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/role-based", roleBasedRouter);

// Existing routes
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/officers", officerRouter);
app.use("/api/dailyCollections", dailyCollectionRouter);
app.use("/api/account", accountRouter);
app.use("/api/savingDailyCollections", savingDailyCollectionRouter);

// Health check endpoint
app.use("/health-check", (req, res) => {
  res.status(200).send({ 
    success: true, 
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json(
    errorResponse(404, "Route not found", `The route ${req.originalUrl} does not exist`)
  );
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json(
    errorResponse(500, "Internal server error", error.message)
  );
});

// Start the server
app.listen(PORT, async () => {
  try {
    // Establish database connection
    await connection;

    // Server listening message
    console.log({ 
      message: `🚀 Server is listening on port ${PORT}`,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
  }
});
