const mongoose = require("mongoose");

const savingAccountDailyCollectionSchema = new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      saving_account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSavingAccount",
        required: true,
      },
      deposit_amount: {
        type: Number,
        required: true,
        default: 0,
      },
      withdraw_amount: {
        type: Number,
        required: true,
        default: 0,
      },
      collected_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "officer",
        required: true,
      },
      collected_officer_name: {
        type: String,
        required: true,
      },
      created_on: {
        type: Date,
        default: Date.now,
      },
    },
    {
      versionKey: false,
    }
  );
  
  const SavingDailyCollectionModel = mongoose.model(
    "accountdailycollection",
    savingAccountDailyCollectionSchema
  );
  
  module.exports = SavingDailyCollectionModel;
  