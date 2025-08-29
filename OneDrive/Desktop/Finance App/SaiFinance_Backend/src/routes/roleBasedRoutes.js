const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { 
  authorizeRoles, 
  authorizeAdmin, 
  authorizeManager, 
  authorizeAccounter, 
  authorizeCollectionOfficer,
  authorizeUser 
} = require("../middlewares/authorization");
const { successResponse } = require("../helpers/successAndError");

const roleBasedRouter = Router();

// Admin routes - only accessible by admin
roleBasedRouter.get("/admin/data", authenticate, authorizeAdmin, (req, res) => {
  res.status(200).json(
    successResponse(200, "Admin data accessed successfully", {
      message: "This is admin-only data",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        systemStats: {
          totalUsers: 150,
          activeUsers: 120,
          totalRevenue: 500000
        },
        adminActions: [
          "User management",
          "System configuration",
          "Financial reports",
          "Security settings"
        ]
      }
    })
  );
});

// Manager routes - accessible by admin and manager
roleBasedRouter.get("/manager/data", authenticate, authorizeManager, (req, res) => {
  res.status(200).json(
    successResponse(200, "Manager data accessed successfully", {
      message: "This is manager-level data",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        teamStats: {
          teamMembers: 25,
          activeProjects: 8,
          monthlyTarget: 100000
        },
        managerActions: [
          "Team management",
          "Project oversight",
          "Performance reviews",
          "Resource allocation"
        ]
      }
    })
  );
});

// Accounter routes - accessible by admin and accounter
roleBasedRouter.get("/accounter/data", authenticate, authorizeAccounter, (req, res) => {
  res.status(200).json(
    successResponse(200, "Accounter data accessed successfully", {
      message: "This is accounter-level data",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        financialStats: {
          totalTransactions: 1500,
          pendingApprovals: 45,
          monthlyRevenue: 75000
        },
        accounterActions: [
          "Financial reporting",
          "Transaction processing",
          "Audit trails",
          "Budget management"
        ]
      }
    })
  );
});

// Collection Officer routes - accessible by admin and collection_officer
roleBasedRouter.get("/collection/data", authenticate, authorizeCollectionOfficer, (req, res) => {
  res.status(200).json(
    successResponse(200, "Collection data accessed successfully", {
      message: "This is collection officer data",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        collectionStats: {
          assignedUsers: 50,
          pendingCollections: 12,
          monthlyCollection: 25000
        },
        collectionActions: [
          "User collection management",
          "Payment processing",
          "Collection reports",
          "Customer communication"
        ]
      }
    })
  );
});

// User routes - accessible by all authenticated users
roleBasedRouter.get("/user/data", authenticate, authorizeUser, (req, res) => {
  res.status(200).json(
    successResponse(200, "User data accessed successfully", {
      message: "This is general user data",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        userInfo: {
          profile: "User profile information",
          preferences: "User preferences",
          history: "User activity history"
        },
        userActions: [
          "View profile",
          "Update information",
          "View transactions",
          "Contact support"
        ]
      }
    })
  );
});

// Mixed access routes - accessible by admin, manager, and accounter
roleBasedRouter.get("/admin-manager-accounter/data", authenticate, authorizeRoles("admin", "manager", "accounter"), (req, res) => {
  res.status(200).json(
    successResponse(200, "Mixed access data retrieved", {
      message: "This data is accessible by admin, manager, and accounter",
      user: {
        id: req.userId,
        role: req.userRole
      },
      data: {
        businessMetrics: {
          revenue: 100000,
          expenses: 75000,
          profit: 25000
        },
        allowedActions: [
          "View business metrics",
          "Generate reports",
          "Financial analysis"
        ]
      }
    })
  );
});

// Role-specific actions
roleBasedRouter.post("/admin/action", authenticate, authorizeAdmin, (req, res) => {
  res.status(200).json(
    successResponse(200, "Admin action executed", {
      message: "Admin-specific action completed",
      action: req.body.action,
      user: {
        id: req.userId,
        role: req.userRole
      }
    })
  );
});

roleBasedRouter.post("/manager/action", authenticate, authorizeManager, (req, res) => {
  res.status(200).json(
    successResponse(200, "Manager action executed", {
      message: "Manager-specific action completed",
      action: req.body.action,
      user: {
        id: req.userId,
        role: req.userRole
      }
    })
  );
});

roleBasedRouter.post("/collection/action", authenticate, authorizeCollectionOfficer, (req, res) => {
  res.status(200).json(
    successResponse(200, "Collection action executed", {
      message: "Collection officer action completed",
      action: req.body.action,
      user: {
        id: req.userId,
        role: req.userRole
      }
    })
  );
});

// Get current user's role and permissions
roleBasedRouter.get("/me/permissions", authenticate, (req, res) => {
  const rolePermissions = {
    admin: [
      "user_management",
      "system_configuration", 
      "financial_reports",
      "security_settings",
      "all_data_access"
    ],
    manager: [
      "team_management",
      "project_oversight",
      "performance_reviews",
      "limited_admin_access"
    ],
    accounter: [
      "financial_reporting",
      "transaction_processing",
      "audit_trails",
      "budget_management"
    ],
    collection_officer: [
      "user_collection_management",
      "payment_processing",
      "collection_reports",
      "customer_communication"
    ],
    user: [
      "view_profile",
      "update_information",
      "view_transactions",
      "contact_support"
    ]
  };

  res.status(200).json(
    successResponse(200, "User permissions retrieved", {
      user: {
        id: req.userId,
        role: req.userRole
      },
      permissions: rolePermissions[req.userRole] || []
    })
  );
});

module.exports = roleBasedRouter;
