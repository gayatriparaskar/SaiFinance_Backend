const axios = require('axios');

// Test admin login with existing user data
async function testAdminLogin() {
  try {
    console.log('🧪 Testing Admin Login...\n');
    
    const loginData = {
      full_name: "Sai Finance",
      password: "your_password_here" // Replace with actual password
    };

    console.log('📤 Sending login request with:');
    console.log('   Full Name:', loginData.full_name);
    console.log('   Password: [HIDDEN]\n');

    const response = await axios.post('http://localhost:3001/api/auth/login', loginData);
    
    console.log('✅ Login successful!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      console.log('\n🎉 Admin login test passed!');
      console.log('👤 User Role:', response.data.data.user.role);
      console.log('🔑 Token received:', response.data.data.accessToken ? 'Yes' : 'No');
    }

  } catch (error) {
    console.error('❌ Login test failed:');
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
console.log('🔧 Admin Login Test Instructions:');
console.log('================================');
console.log('1. Make sure your backend server is running on port 3001');
console.log('2. You need to find the actual password for your admin user');
console.log('3. Options to find/reset password:');
console.log('   a) Check if you remember the password');
console.log('   b) Use MongoDB to reset the password:');
console.log('      db.users.updateOne(');
console.log('        { full_name: "Sai Finance" },');
console.log('        { $set: { password: "$2b$10$CPdWl7cBMi45ypuQi7coYuYNK4.A7h0IE2U631Zcog3siQXhd6LVi" } }');
console.log('      )');
console.log('   c) Create a new admin user using the officer creation form');
console.log('4. Replace "your_password_here" with the actual password');
console.log('5. Uncomment the line below and run: node test-admin-login.js\n');

// Uncomment the line below to run the test
// testAdminLogin();
