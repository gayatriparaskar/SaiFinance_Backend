const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
  {
    officer_code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const OfficerModel = mongoose.model("officer", officerSchema);

module.exports = OfficerModel;
