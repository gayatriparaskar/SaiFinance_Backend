const mongoose = require("mongoose");

const loanDetailSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    loan_amount: { type: Number, required: true },
    principle_amount: { type: Number, required: true },
    file_charge: { type: Number, required: true },
    interest_rate: { type: String, required: true },
    duration_months: { type: Number, required: true },
    emi_day: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    total_interest_pay: { type: Number, required: true, default: 0 },
    total_penalty_amount: { type: Number, required: true, default: 0 },
    total_due_amount: { type: Number, required: true, default: 0 },
    created_on: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const LoanDetailModel = mongoose.model("loandetail", loanDetailSchema);

module.exports = LoanDetailModel;
