const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3001/api';
let adminToken = '';
let managerToken = '';
let accounterToken = '';
let collectionOfficerToken = '';
let userToken = '';

// Test data
const testUsers = {
  admin: {
    full_name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    phone_number: "1111111111",
    role: "admin",
    dob: "1990-01-01",
    address: "Admin Address",
    aadhar_no: "111111111111",
    pan_no: "ADMIN1234A",
    monthly_income: 100000
  },
  manager: {
    full_name: "Manager User",
    email: "manager@test.com",
    password: "manager123",
    phone_number: "2222222222",
    role: "manager",
    dob: "1990-01-01",
    address: "Manager Address",
    aadhar_no: "222222222222",
    pan_no: "MANAG1234B",
    monthly_income: 80000
  },
  accounter: {
    full_name: "Accounter User",
    email: "accounter@test.com",
    password: "accounter123",
    phone_number: "3333333333",
    role: "accounter",
    dob: "1990-01-01",
    address: "Accounter Address",
    aadhar_no: "333333333333",
    pan_no: "ACCOU1234C",
    monthly_income: 60000
  },
  collection_officer: {
    full_name: "Collection Officer User",
    email: "collection@test.com",
    password: "collection123",
    phone_number: "4444444444",
    role: "collection_officer",
    dob: "1990-01-01",
    address: "Collection Address",
    aadhar_no: "444444444444",
    pan_no: "COLLO1234D",
    monthly_income: 50000
  },
  user: {
    full_name: "Regular User",
    email: "user@test.com",
    password: "user123",
    phone_number: "5555555555",
    role: "user",
    dob: "1990-01-01",
    address: "User Address",
    aadhar_no: "555555555555",
    pan_no: "USER1234E",
    monthly_income: 40000
  }
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (method, endpoint, token, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return {
      error: true,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      error: error.response?.data?.error || error.message
    };
  }
};

// Test functions
const testRegistration = async (userData) => {
  console.log(`\n🔐 Testing registration for ${userData.role}...`);
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    console.log(`✅ ${userData.role} registration successful:`, response.data.message);
    return response.data.data.accessToken;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log(`⚠️  ${userData.role} already exists, proceeding to login...`);
      return await testLogin(userData);
    } else {
      console.log(`❌ ${userData.role} registration failed:`, error.response?.data?.message || error.message);
      return null;
    }
  }
};

const testLogin = async (userData) => {
  console.log(`\n🔑 Testing login for ${userData.role}...`);
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: userData.email,
      password: userData.password
    });
    console.log(`✅ ${userData.role} login successful:`, response.data.message);
    return response.data.data.accessToken;
  } catch (error) {
    console.log(`❌ ${userData.role} login failed:`, error.response?.data?.message || error.message);
    return null;
  }
};

const testRoleBasedAccess = async () => {
  console.log('\n🛡️ Testing Role-Based Access Control...');
  
  const tests = [
    {
      name: 'Admin accessing admin data',
      endpoint: '/role-based/admin/data',
      token: adminToken,
      expectedSuccess: true
    },
    {
      name: 'Manager accessing admin data',
      endpoint: '/role-based/admin/data',
      token: managerToken,
      expectedSuccess: false
    },
    {
      name: 'Manager accessing manager data',
      endpoint: '/role-based/manager/data',
      token: managerToken,
      expectedSuccess: true
    },
    {
      name: 'Accounter accessing accounter data',
      endpoint: '/role-based/accounter/data',
      token: accounterToken,
      expectedSuccess: true
    },
    {
      name: 'Collection Officer accessing collection data',
      endpoint: '/role-based/collection/data',
      token: collectionOfficerToken,
      expectedSuccess: true
    },
    {
      name: 'User accessing user data',
      endpoint: '/role-based/user/data',
      token: userToken,
      expectedSuccess: true
    },
    {
      name: 'User accessing admin data (should fail)',
      endpoint: '/role-based/admin/data',
      token: userToken,
      expectedSuccess: false
    },
    {
      name: 'Admin accessing mixed access data',
      endpoint: '/role-based/admin-manager-accounter/data',
      token: adminToken,
      expectedSuccess: true
    },
    {
      name: 'Manager accessing mixed access data',
      endpoint: '/role-based/admin-manager-accounter/data',
      token: managerToken,
      expectedSuccess: true
    },
    {
      name: 'Collection Officer accessing mixed access data (should fail)',
      endpoint: '/role-based/admin-manager-accounter/data',
      token: collectionOfficerToken,
      expectedSuccess: false
    }
  ];

  for (const test of tests) {
    console.log(`\n🧪 ${test.name}...`);
    const result = await makeAuthenticatedRequest('GET', test.endpoint, test.token);
    
    if (result.error) {
      if (test.expectedSuccess) {
        console.log(`❌ Unexpected failure: ${result.message}`);
      } else {
        console.log(`✅ Expected failure: ${result.message}`);
      }
    } else {
      if (test.expectedSuccess) {
        console.log(`✅ Success: ${result.message}`);
      } else {
        console.log(`❌ Unexpected success: ${result.message}`);
      }
    }
  }
};

const testPermissions = async () => {
  console.log('\n🔐 Testing User Permissions...');
  
  const users = [
    { name: 'Admin', token: adminToken },
    { name: 'Manager', token: managerToken },
    { name: 'Accounter', token: accounterToken },
    { name: 'Collection Officer', token: collectionOfficerToken },
    { name: 'User', token: userToken }
  ];

  for (const user of users) {
    if (user.token) {
      console.log(`\n👤 ${user.name} permissions:`);
      const result = await makeAuthenticatedRequest('GET', '/role-based/me/permissions', user.token);
      
      if (result.error) {
        console.log(`❌ Failed to get permissions: ${result.message}`);
      } else {
        console.log(`✅ Permissions: ${result.data.permissions.join(', ')}`);
      }
    }
  }
};

const testProfileOperations = async () => {
  console.log('\n👤 Testing Profile Operations...');
  
  // Test get profile
  console.log('\n📋 Getting user profile...');
  const profileResult = await makeAuthenticatedRequest('GET', '/auth/profile', userToken);
  
  if (profileResult.error) {
    console.log(`❌ Failed to get profile: ${profileResult.message}`);
  } else {
    console.log(`✅ Profile retrieved: ${profileResult.data.user.full_name}`);
  }

  // Test update profile
  console.log('\n✏️ Updating user profile...');
  const updateData = {
    full_name: "Updated User Name",
    address: "Updated Address"
  };
  
  const updateResult = await makeAuthenticatedRequest('PUT', '/auth/profile', userToken, updateData);
  
  if (updateResult.error) {
    console.log(`❌ Failed to update profile: ${updateResult.message}`);
  } else {
    console.log(`✅ Profile updated: ${updateResult.message}`);
  }
};

const testPasswordChange = async () => {
  console.log('\n🔒 Testing Password Change...');
  
  const passwordData = {
    currentPassword: "user123",
    newPassword: "newuser123"
  };
  
  const result = await makeAuthenticatedRequest('PUT', '/auth/change-password', userToken, passwordData);
  
  if (result.error) {
    console.log(`❌ Failed to change password: ${result.message}`);
  } else {
    console.log(`✅ Password changed: ${result.message}`);
    
    // Test login with new password
    console.log('\n🔑 Testing login with new password...');
    const loginResult = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUsers.user.email,
      password: "newuser123"
    });
    
    if (loginResult.data.success) {
      console.log(`✅ Login with new password successful`);
      // Update user token
      userToken = loginResult.data.data.accessToken;
    } else {
      console.log(`❌ Login with new password failed`);
    }
  }
};

// Main test function
const runTests = async () => {
  console.log('🚀 Starting Role-Based Authentication System Tests...\n');
  
  try {
    // Test server connectivity
    console.log('🔍 Testing server connectivity...');
    const healthCheck = await axios.get(`${BASE_URL.replace('/api', '')}/health-check`);
    console.log(`✅ Server is running: ${healthCheck.data.message}`);
    
    // Register/Login all users
    console.log('\n👥 Setting up test users...');
    adminToken = await testRegistration(testUsers.admin);
    managerToken = await testRegistration(testUsers.manager);
    accounterToken = await testRegistration(testUsers.accounter);
    collectionOfficerToken = await testRegistration(testUsers.collection_officer);
    userToken = await testRegistration(testUsers.user);
    
    // Run tests
    await testRoleBasedAccess();
    await testPermissions();
    await testProfileOperations();
    await testPasswordChange();
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testUsers,
  makeAuthenticatedRequest
};
