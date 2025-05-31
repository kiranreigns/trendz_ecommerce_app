import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  size: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Ordered", "Shipped", "Out for delivery", "Delivered", "Cancelled", "Returned"],
    default: "Ordered",
  },
});

const paymentSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    enum: ["COD", "Card"],
    default: "COD",
  },

  paymentGateway: {
    type: String,
    enum: ["Stripe", "Razorpay", ""],
    default: "",
  },

  transactionId: {
    type: String,
    default: "",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    default: "Pending",
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [orderItemSchema],

  total: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Ordered", "Shipped", "Out for delivery", "Delivered", "Cancelled"],
    default: "Ordered",
  },

  shippingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },

  payment: paymentSchema,

  orderedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);

export { orderSchema, Order };
