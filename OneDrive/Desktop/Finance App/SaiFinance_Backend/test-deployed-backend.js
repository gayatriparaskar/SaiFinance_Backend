const axios = require('axios');

// Test deployed backend connection and admin login
async function testDeployedBackend() {
  const BASE_URL = 'https://saifinance-backend.onrender.com';
  
  try {
    console.log('🧪 Testing Deployed Backend Connection...\n');
    
    // Test 1: Basic connectivity
    console.log('📡 Test 1: Basic Connectivity');
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Backend is running:', healthResponse.data);
    console.log('');
    
    // Test 2: Auth endpoints
    console.log('🔐 Test 2: Auth Endpoints');
    try {
      const authResponse = await axios.get(`${BASE_URL}/api/auth`);
      console.log('✅ Auth routes available:', authResponse.status);
    } catch (error) {
      console.log('ℹ️ Auth routes might be protected or not exist');
    }
    console.log('');
    
    // Test 3: Admin login with existing user
    console.log('👤 Test 3: Admin Login Test');
    const loginData = {
      full_name: "Sai Finance",
      password: "your_password_here" // Replace with actual password
    };

    console.log('📤 Attempting login with:');
    console.log('   Full Name:', loginData.full_name);
    console.log('   Password: [HIDDEN]');
    console.log('   URL:', `${BASE_URL}/api/auth/login`);
    console.log('');

    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
    
    if (loginResponse.data.success) {
      console.log('🎉 Login successful!');
      console.log('👤 User Role:', loginResponse.data.data.user.role);
      console.log('🔑 Token received:', loginResponse.data.data.accessToken ? 'Yes' : 'No');
      console.log('📊 Response:', JSON.stringify(loginResponse.data, null, 2));
    } else {
      console.log('❌ Login failed:', loginResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data.message);
      console.error('   Details:', error.response.data.details);
    } else {
      console.error('   Error:', error.message);
    }
  }
}

// Instructions for testing
console.log('🔧 Deployed Backend Test Instructions:');
console.log('=====================================');
console.log('1. The backend is deployed at: https://saifinance-backend.onrender.com/');
console.log('2. You need to find the actual password for your admin user');
console.log('3. Options to find/reset password:');
console.log('   a) Check if you remember the password');
console.log('   b) Use MongoDB to reset the password');
console.log('   c) Create a new admin user using the officer creation form');
console.log('4. Replace "your_password_here" with the actual password');
console.log('5. Uncomment the line below and run: node test-deployed-backend.js');
console.log('6. If successful, you can use these credentials in the frontend\n');

// Uncomment the line below to run the test
// testDeployedBackend();
