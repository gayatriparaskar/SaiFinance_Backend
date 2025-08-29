const mongoose = require("mongoose");

const DailyCollectionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    loan_detail_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "loandetail",
      required: true,
    },
    amount: { 
      type: Number, 
      required: true ,
      default : 0
    },
    collected_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "officer",
      required: true,
    },
    total_penalty_amount: {
      type: Number,
      
    },
     penalty_type: {
      type: String,
      enum: ["percentage", "amount", null],
      default: null,
    },
    penalty_value: {
      type: Number,
      default: 0,
    },
    collected_officer_name: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const DailyCollectionModel = mongoose.model(
  "dailycollection",
  DailyCollectionSchema
);

module.exports = DailyCollectionModel;
