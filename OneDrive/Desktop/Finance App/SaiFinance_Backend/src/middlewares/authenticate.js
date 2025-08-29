const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/successAndError");
const UserModel = require("../models/userModel");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Middleware for authenticating JWT tokens
const authenticate = async (req, res, next) => {
  try {
    // Retrieve token from the Authorization header
    let token = req.header("Authorization");
    
    // Remove "Bearer " prefix if present
    if (token && token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    // If token is not provided, deny access
    if (!token) {
      return res
        .status(401)
        .json(errorResponse(401, "Access denied", "No token provided"));
    }

    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

      // Check if user still exists and is active
      const user = await UserModel.findById(decoded.userId);
      
      if (!user) {
        return res
          .status(401)
          .json(errorResponse(401, "Access denied", "User not found"));
      }

      if (!user.is_active) {
        return res
          .status(401)
          .json(errorResponse(401, "Access denied", "User account is deactivated"));
      }

      if (user.is_deleted) {
        return res
          .status(401)
          .json(errorResponse(401, "Access denied", "User account is deleted"));
      }

      // Attach the user information to the request object
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      req.user = user;

      // Continue to the next middleware or route handler
      next();
    } catch (jwtError) {
      return res
        .status(401)
        .json(errorResponse(401, "Access denied", "Invalid or expired token"));
    }
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res
      .status(500)
      .json(errorResponse(500, "Internal server error", "Authentication failed"));
  }
};

module.exports = { authenticate };
