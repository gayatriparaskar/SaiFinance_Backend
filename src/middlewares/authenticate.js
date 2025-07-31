const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/successAndError");
const UserModel = require("../models/userModel");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

//Middleware for authenticating JWT tokens
const authenticate = async (req, res, next) => {
  // const { authorization } = req.headers;
  // Retrieve token from the Authorization header
  let token = req.header("Authorization");
  token = token && token.replace("Bearer ", "");
  // If token is not provided, deny access
  if (!token) {
    return res
      .status(401)
      .json(errorResponse(401, "Unauthorized - No token provided", null));
  }
  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // Attach the user information to the request object
    const userId = decoded.userId;
    req.userId = userId;
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res
      .status(401)
      .json(
        errorResponse(
          401,
          "error inside authentication middleware",
          error.message
        )
      );
  }
};

module.exports = { authenticate };
