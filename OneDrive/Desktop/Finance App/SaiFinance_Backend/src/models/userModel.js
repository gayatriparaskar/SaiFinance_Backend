const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      lowercase: true,
      index: true 
    },
    active_loan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "loandetail",
      index: true,
    },
    saving_account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSavingAccount",
      index: true,
    },
    officer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "officer",
      index: true,
    },
    password: { type: String, required: true },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    account_type:{type: String,enum:["loan account","saving account"], default: "loan account"},
    dob: { type: String, required: true },
    address: { type: String, required: true },
    aadhar_no: { type: String, required: true },
    pan_no: { type: String, required: true },
    monthly_income: { type: Number, required: true },
    shop_name: { type: String },
    shop_address: { type: String },
    kyc_completed: { type: Boolean, default: false },
    is_on_hold: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    is_mobile_verified: { type: Boolean, default: false },
    is_payment_completed: { type: Boolean, default: false },
    payment_completed_on: { type: Date },
    role: { 
      type: String, 
      enum: ["admin", "accounter", "manager", "collection_officer", "user"], 
      default: "user",
      required: true
    },
    is_active: { type: Boolean, default: true },
    last_login: { type: Date },
    created_on: { type: Date, default: Date.now },
    end_date: { type: Date },
  },
  {
    versionKey: false,
  }
);

userSchema.index({
  full_name: "text",
  email: "text",
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
