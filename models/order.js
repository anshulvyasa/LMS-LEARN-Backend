const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  orderDate: Date,
  paymentId: String,
  payerId: String,
  instrutorId: String,
  instructorName: String,
  courseImage: String,
  courseTitle: String,
  courseId: String,
  coursePricing: String,
});

module.exports = mongoose.model("OrderSchema", orderSchema);
