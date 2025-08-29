# Role-Based Authentication System Documentation

## 🎯 Overview

This document describes the implementation of a comprehensive role-based authentication system for the SaiFinance backend. The system supports five distinct roles with different levels of access and permissions.

## 🔐 Roles & Permissions

### Available Roles
1. **admin** - Full system access
2. **accounter** - Financial and accounting operations
3. **manager** - Team and project management
4. **collection_officer** - Collection and payment operations
5. **user** - Basic user access

### Role Hierarchy
```
admin (highest)
├── manager
├── accounter
├── collection_officer
└── user (lowest)
```

## 🚀 API Endpoints

### Authentication Endpoints

#### 1. User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone_number": "1234567890",
  "role": "user",
  "dob": "1990-01-01",
  "address": "123 Main St",
  "aadhar_no": "123456789012",
  "pan_no": "ABCDE1234F",
  "monthly_income": 50000,
  "shop_name": "John's Shop",
  "shop_address": "456 Shop St"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone_number": "1234567890",
      "role": "user",
      "is_active": true,
      "created_on": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt_token_here"
  }
}
```

#### 2. User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone_number": "1234567890",
      "role": "user",
      "is_active": true,
      "last_login": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt_token_here"
  }
}
```

#### 3. Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

#### 4. Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "full_name": "John Updated",
  "phone_number": "9876543210",
  "address": "789 New St"
}
```

#### 5. Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

#### 6. Logout
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

## 🛡️ Role-Based Access Control

### Role-Based Routes

#### Admin Only Routes
```http
GET /api/role-based/admin/data
POST /api/role-based/admin/action
```
**Access:** Only users with `admin` role

#### Manager Routes
```http
GET /api/role-based/manager/data
POST /api/role-based/manager/action
```
**Access:** Users with `admin` or `manager` role

#### Accounter Routes
```http
GET /api/role-based/accounter/data
```
**Access:** Users with `admin` or `accounter` role

#### Collection Officer Routes
```http
GET /api/role-based/collection/data
POST /api/role-based/collection/action
```
**Access:** Users with `admin` or `collection_officer` role

#### User Routes
```http
GET /api/role-based/user/data
```
**Access:** All authenticated users

#### Mixed Access Routes
```http
GET /api/role-based/admin-manager-accounter/data
```
**Access:** Users with `admin`, `manager`, or `accounter` role

### Get User Permissions
```http
GET /api/role-based/me/permissions
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User permissions retrieved",
  "data": {
    "user": {
      "id": "user_id",
      "role": "admin"
    },
    "permissions": [
      "user_management",
      "system_configuration",
      "financial_reports",
      "security_settings",
      "all_data_access"
    ]
  }
}
```

## 🔧 Middleware Usage

### Authentication Middleware
```javascript
const { authenticate } = require("../middlewares/authenticate");

// Apply to routes that require authentication
app.get("/protected-route", authenticate, (req, res) => {
  // req.userId - User ID from JWT
  // req.userRole - User role from JWT
  // req.user - Full user object from database
});
```

### Authorization Middleware
```javascript
const { 
  authorizeRoles, 
  authorizeAdmin, 
  authorizeManager,
  authorizeAccounter,
  authorizeCollectionOfficer,
  authorizeUser 
} = require("../middlewares/authorization");

// Specific role authorization
app.get("/admin-only", authenticate, authorizeAdmin, (req, res) => {
  // Only admin can access
});

// Multiple roles authorization
app.get("/manager-level", authenticate, authorizeManager, (req, res) => {
  // Admin and manager can access
});

// Custom role authorization
app.get("/custom-access", authenticate, authorizeRoles("admin", "accounter"), (req, res) => {
  // Only admin and accounter can access
});
```

## 📊 Role Permissions Matrix

| Permission | Admin | Manager | Accounter | Collection Officer | User |
|------------|-------|---------|-----------|-------------------|------|
| User Management | ✅ | ❌ | ❌ | ❌ | ❌ |
| System Configuration | ✅ | ❌ | ❌ | ❌ | ❌ |
| Financial Reports | ✅ | ✅ | ✅ | ❌ | ❌ |
| Security Settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Team Management | ✅ | ✅ | ❌ | ❌ | ❌ |
| Project Oversight | ✅ | ✅ | ❌ | ❌ | ❌ |
| Transaction Processing | ✅ | ❌ | ✅ | ❌ | ❌ |
| Collection Management | ✅ | ❌ | ❌ | ✅ | ❌ |
| View Profile | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update Information | ✅ | ✅ | ✅ | ✅ | ✅ |

## 🔒 Security Features

### JWT Token Structure
```javascript
{
  "userId": "user_id_here",
  "role": "user_role_here",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Passwords are never stored in plain text
- Password change requires current password verification

### Token Security
- JWT tokens expire after 24 hours
- Tokens include user role for authorization
- Automatic token validation on each request

### Account Security
- User accounts can be deactivated (`is_active: false`)
- User accounts can be soft deleted (`is_deleted: true`)
- Last login tracking for security monitoring

## 🚨 Error Handling

### Authentication Errors
```json
{
  "success": false,
  "message": "Access denied",
  "error": "No token provided"
}
```

### Authorization Errors
```json
{
  "success": false,
  "message": "Access forbidden",
  "error": "Access denied. Required roles: admin, manager. Your role: user"
}
```

### Validation Errors
```json
{
  "success": false,
  "message": "Missing required fields",
  "error": "full_name, email, password, and phone_number are required"
}
```

## 🧪 Testing Examples

### Test User Registration
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone_number": "1234567890",
    "role": "user",
    "dob": "1990-01-01",
    "address": "Test Address",
    "aadhar_no": "123456789012",
    "pan_no": "ABCDE1234F",
    "monthly_income": 50000
  }'
```

### Test User Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Role-Based Access
```bash
# Get admin data (requires admin role)
curl -X GET http://localhost:3001/api/role-based/admin/data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get user permissions
curl -X GET http://localhost:3001/api/role-based/me/permissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔄 Migration Guide

### Updating Existing Users
To update existing users to use the new role system:

1. **Update User Model**: The user model has been updated with new role enum
2. **Migrate Existing Users**: Update existing users' roles to match new system
3. **Update Frontend**: Ensure frontend sends email for login instead of phone_number
4. **Test Authentication**: Verify all authentication flows work correctly

### Database Migration Script
```javascript
// Example migration script
const migrateUserRoles = async () => {
  const users = await UserModel.find({});
  
  for (const user of users) {
    // Map old roles to new roles
    let newRole = 'user';
    
    if (user.role === 'admin') newRole = 'admin';
    else if (user.role === 'customer') newRole = 'user';
    
    await UserModel.findByIdAndUpdate(user._id, { 
      role: newRole,
      is_active: true 
    });
  }
};
```

## 📝 Environment Variables

Required environment variables:

```env
# JWT Configuration
ACCESS_TOKEN_SECRET=your_jwt_secret_key_here

# Database Configuration
MONGO_URL=your_mongodb_connection_string

# Server Configuration
PORT=3001
NODE_ENV=development
```

## 🎯 Best Practices

1. **Always validate user input** before processing
2. **Use HTTPS** in production for secure token transmission
3. **Implement rate limiting** to prevent brute force attacks
4. **Log authentication events** for security monitoring
5. **Regularly rotate JWT secrets** for enhanced security
6. **Use strong password policies** for user registration
7. **Implement account lockout** after failed login attempts
8. **Monitor for suspicious activity** and implement alerts

## 🚀 Future Enhancements

1. **Refresh Tokens**: Implement refresh token mechanism
2. **Two-Factor Authentication**: Add 2FA support
3. **Role Hierarchy**: Implement role inheritance
4. **Permission Granularity**: Add field-level permissions
5. **Audit Logging**: Comprehensive audit trail
6. **Session Management**: Multiple device session handling
7. **OAuth Integration**: Social login support
8. **API Rate Limiting**: Prevent abuse

---

*This documentation is part of the SaiFinance Role-Based Authentication System v2.0.0*
