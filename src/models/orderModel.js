const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

// Create a User model using the defined schema
const OrderModel = mongoose.model("order", orderSchema);

// Export the User model
module.exports = OrderModel;
