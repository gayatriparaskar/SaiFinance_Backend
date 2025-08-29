const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../helpers/successAndError");

// JWT Secret from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};

// Register new user
const register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone_number,
      role = "user",
      dob,
      address,
      aadhar_no,
      pan_no,
      monthly_income,
      shop_name,
      shop_address
    } = req.body;

    // Validation
    if (!full_name || !email || !password || !phone_number) {
      return res.status(400).json(
        errorResponse(400, "Missing required fields", "full_name, email, password, and phone_number are required")
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email: email.toLowerCase() }, { phone_number }]
    });

    if (existingUser) {
      return res.status(409).json(
        errorResponse(409, "User already exists", "Email or phone number already registered")
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new UserModel({
      full_name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone_number,
      role,
      dob,
      address,
      aadhar_no,
      pan_no,
      monthly_income,
      shop_name,
      shop_address
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id, newUser.role);

    // Return success response (without password)
    const userResponse = {
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role,
      is_active: newUser.is_active,
      created_on: newUser.created_on
    };

    res.status(201).json(
      successResponse(201, "User registered successfully", {
        user: userResponse,
        accessToken: token
      })
    );

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password, user_name, full_name } = req.body;

    // Validation - support multiple login methods
    if (!password) {
      return res.status(400).json(
        errorResponse(400, "Missing password", "Password is required")
      );
    }

    // Check if we have any identifier (email, user_name, or full_name)
    if (!email && !user_name && !full_name) {
      return res.status(400).json(
        errorResponse(400, "Missing identifier", "Email, user_name, or full_name is required")
      );
    }

    // Build query to find user by email, user_name, or full_name
    let userQuery = { is_deleted: false };
    
    if (email) {
      userQuery.email = email.toLowerCase();
    } else if (user_name) {
      userQuery.user_name = user_name;
    } else if (full_name) {
      userQuery.full_name = full_name;
    }

    // Find user
    const user = await UserModel.findOne(userQuery);

    if (!user) {
      return res.status(401).json(
        errorResponse(401, "Invalid credentials", "User not found with provided credentials")
      );
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json(
        errorResponse(401, "Account deactivated", "Your account has been deactivated")
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(
        errorResponse(401, "Invalid credentials", "Password is incorrect")
      );
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Return success response (without password)
    const userResponse = {
      id: user._id,
      full_name: user.full_name,
      email: user.email || user.user_name, // Use user_name as email if email doesn't exist
      phone_number: user.phone_number,
      role: user.role,
      is_active: user.is_active,
      last_login: user.last_login
    };

    res.status(200).json(
      successResponse(200, "Login successful", {
        user: userResponse,
        accessToken: token
      })
    );

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json(
        errorResponse(404, "User not found", "User profile not found")
      );
    }

    res.status(200).json(
      successResponse(200, "Profile retrieved successfully", { user })
    );

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { full_name, phone_number, address, shop_name, shop_address } = req.body;
    
    const updateData = {};
    if (full_name) updateData.full_name = full_name;
    if (phone_number) updateData.phone_number = phone_number;
    if (address) updateData.address = address;
    if (shop_name) updateData.shop_name = shop_name;
    if (shop_address) updateData.shop_address = shop_address;

    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json(
        errorResponse(404, "User not found", "User profile not found")
      );
    }

    res.status(200).json(
      successResponse(200, "Profile updated successfully", { user })
    );

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json(
        errorResponse(400, "Missing passwords", "Current and new passwords are required")
      );
    }

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json(
        errorResponse(404, "User not found", "User profile not found")
      );
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json(
        errorResponse(401, "Invalid password", "Current password is incorrect")
      );
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json(
      successResponse(200, "Password changed successfully", { message: "Password updated successfully" })
    );

  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

// Logout (client-side token removal, but we can track here if needed)
const logout = async (req, res) => {
  try {
    // In a more advanced system, you might want to blacklist the token
    // For now, we'll just return a success message
    res.status(200).json(
      successResponse(200, "Logout successful", { message: "Logged out successfully" })
    );
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json(
      errorResponse(500, "Internal server error", error.message)
    );
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
};
