const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
  {
    officer_code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    phone_number: { type: String,  unique: true, trim: true },
    email: { type: String, trim: true, unique: true },
    address: { type: String, trim: true },
    pan: { type: String, trim: true },
    aadhar: { type: String, trim: true },
    dob: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now },

    // ✅ User collection details
    user_collections: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // User reference
        name: { type: String, trim: true },
        phone_number: { type: String, trim: true },
        account_type: { type: String, enum: ["loan account", "saving account"] }, // loan / saving
        collected_amount: { type: Number, default: 0 },
        penalty: { type: Number, default: 0 },
        collected_on: { type: Date, default: Date.now },
      },
    ],

    // ✅ Total collected amounts
    totalLoanAmount: { type: Number, default: 0 },
    todayLoanAmount: { type: Number, default: 0 },
    totalSavingAmount: { type: Number, default: 0 },
    todaySavingAmount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const OfficerModel = mongoose.model("officer", officerSchema);

module.exports = OfficerModel;
