const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");
const UserModel = require("../models/userModel");
const LoanDetailModel = require("../models/loanDetailModel");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

module.exports.addNewUser = async (req, res) => {
  try {
    // Extract user information from the request body
    const { phone_number, loan_details } = req.body;

    if (!phone_number) {
      return res
        .status(401)
        .json(errorResponse(401, "phone_number field is required"));
    }
    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ phone_number });

    if (existingUser) {
      // Email is already registered
      return res
        .status(400)
        .json(
          errorResponse(
            400,
            "phone_number already in use, Please use different phone_number."
          )
        );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(phone_number, SALT_ROUNDS);

    if (!hashedPassword) {
      // Handle password hashing error
      return res
        .status(500)
        .json(errorResponse(500, "Password hashing failed"));
    }

    delete req.body.password;
    delete loan_details.total_due_amount;
    // Create a new user document with hashed password
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
    const loanDetail = new LoanDetailModel({
      ...loan_details,
      user_id: newUser._id,
      total_due_amount: loan_details.total_amount,
    });

    await loanDetail.save();
    newUser.active_loan_id = loanDetail._id;
    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res
      .status(201)
      .json(
        successResponse(
          201,
          `${req.body.full_name} has been registered successfully with _Id-${newUser._id}`,
          newUser
        )
      );
  } catch (error) {
    console.log(error.message);
    // Handle bad request
    res.status(400).json(errorResponse(400, error.message));
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    // Extract user information from the request body
    const { phone_number, password } = req.body;

    // Find the user by email
    let user = await UserModel.findOne({ phone_number }).lean();

    // If user doesn't exist or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(errorResponse(401, "Invalid credentials"));
    }

    // Generate a JWT token
    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    // Respond with a success message and the JWT token
    let succData = successResponse(200, "Login successful", user);
    succData.accessToken = accessToken;

    res.status(200).json(succData);
  } catch (error) {
    console.log(error.message);
    // Handle server error
    res.status(500).json(errorResponse(500, error.message));
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    // Extract user information from the request body
    const { user_name, password } = req.body;

    // Find the user by email
    let user = await UserModel.findOne({ user_name }).lean();

    // If user doesn't exist or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(errorResponse(401, "Invalid credentials"));
    }

    // Generate a JWT token
    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    // Respond with a success message and the JWT token
    let succData = successResponse(200, "Login successful", user);
    succData.accessToken = accessToken;

    res.status(200).json(succData);
  } catch (error) {
    console.log(error.message);
    // Handle server error
    res.status(500).json(errorResponse(500, error.message));
  }
};
