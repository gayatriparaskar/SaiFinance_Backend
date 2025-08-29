const { errorResponse } = require("../helpers/successAndError");

// Role-based authorization middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user role is attached to request (from auth middleware)
      if (!req.userRole) {
        return res
          .status(403)
          .json(errorResponse(403, "Access forbidden", "User role not found"));
      }

      // Check if user's role is in the allowed roles
      if (allowedRoles.includes(req.userRole)) {
        return next();
      } else {
        return res
          .status(403)
          .json(errorResponse(403, "Access forbidden", 
            `Access denied. Required roles: ${allowedRoles.join(', ')}. Your role: ${req.userRole}`));
      }
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res
        .status(500)
        .json(errorResponse(500, "Internal server error", "Authorization failed"));
    }
  };
};

// Specific role authorization functions for convenience
const authorizeAdmin = authorizeRoles("admin");
const authorizeManager = authorizeRoles("admin", "manager");
const authorizeAccounter = authorizeRoles("admin", "accounter");
const authorizeCollectionOfficer = authorizeRoles("admin", "collection_officer");
const authorizeUser = authorizeRoles("admin", "manager", "accounter", "collection_officer", "user");

// Check if user has specific role
const hasRole = (role) => {
  return (req, res, next) => {
    if (req.userRole === role) {
      return next();
    } else {
      return res
        .status(403)
        .json(errorResponse(403, "Access forbidden", 
          `Access denied. Required role: ${role}. Your role: ${req.userRole}`));
    }
  };
};

// Check if user has any of the specified roles
const hasAnyRole = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userRole)) {
      return next();
    } else {
      return res
        .status(403)
        .json(errorResponse(403, "Access forbidden", 
          `Access denied. Required roles: ${roles.join(', ')}. Your role: ${req.userRole}`));
    }
  };
};

// Check if user has all of the specified roles (useful for complex permissions)
const hasAllRoles = (...roles) => {
  return (req, res, next) => {
    const userRoles = [req.userRole]; // In this system, users have one role
    const hasAll = roles.every(role => userRoles.includes(role));
    
    if (hasAll) {
      return next();
    } else {
      return res
        .status(403)
        .json(errorResponse(403, "Access forbidden", 
          `Access denied. Required all roles: ${roles.join(', ')}. Your role: ${req.userRole}`));
    }
  };
};

module.exports = {
  authorizeRoles,
  authorizeAdmin,
  authorizeManager,
  authorizeAccounter,
  authorizeCollectionOfficer,
  authorizeUser,
  hasRole,
  hasAnyRole,
  hasAllRoles
};
