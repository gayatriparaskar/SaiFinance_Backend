const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import the User model
const UserModel = require('./src/models/userModel');

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: 'admin@test.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@test.com');
      console.log('Password: admin123');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const adminUser = new UserModel({
      full_name: 'Admin User',
      email: 'admin@test.com',
      phone_number: '1234567890',
      password: hashedPassword,
      role: 'admin',
      is_active: true,
      is_deleted: false
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@test.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
createAdminUser();
