const mongoose = require("mongoose");

const userSavingAccountSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    account_number: {
      type: String,
      unique: true,
    },
    current_amount: {
      type: Number,
      default: 0,
    },
    amount_to_be: {
      type: Number,
      default: 0,
    },
    total_withdrawal: {
      type: Number,
      default: 0,
    },
    daily_withdrawal_limit: {
      type: Number,
      default: 10000,
    },
    interest_rate: {
      type: String,
      required: true,
    },
    emi_day: { type: Number, required: true , default: 0},
    emi_amount: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    interest_payed: { type: Number, required: true, default: 0 },
    total_interest_pay: { type: Number, required: true, default: 0 },
    emi_payed : { type : Number, default:0},
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    created_on: {
      type: Date,
      default: Date.now,
    },
    last_interest_applied_on: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

userSavingAccountSchema.pre("save", async function (next) {
  if (!this.account_number) {
    const lastAccount = await mongoose
      .model("UserSavingAccount")
      .findOne({}, {}, { sort: { created_on: -1 } });

    if (lastAccount && lastAccount.account_number) {
      const lastNumber = parseInt(
        lastAccount.account_number.replace("SF", ""),
        10
      );
      this.account_number = `SF${String(lastNumber + 1).padStart(4, "0")}`;
    } else {
      this.account_number = "SF0001";
    }
  }
  next();
});

const SavingModel = mongoose.model(
  "UserSavingAccount",
  userSavingAccountSchema
);

module.exports = SavingModel;
