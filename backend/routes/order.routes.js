import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  createStripeSession,
  createRazorpayOrder,
  verifyRazorpayPayment,
  handleStripeWebhook,
  createOrderFromStripeSession,
} from "../controllers/order.controller.js";
import {
  authorizeAdmin,
  authorizeUser,
} from "../middlewares/auth.middleware.js";

const orderRouter = Router();

// User order routes
orderRouter.post("/", authorizeUser, createOrder);

// Get user orders
orderRouter.get("/", authorizeUser, getUserOrders);

// Cancel user order or order item
orderRouter.delete("/:orderId", authorizeUser, cancelOrder);

// Update order status or order item status (admin only)
orderRouter.put("/:orderId", authorizeAdmin, updateOrderStatus);

// Update order item status (user can update to "Returned" only)
orderRouter.put("/:orderId/items/:itemId", authorizeUser, updateOrderStatus);

// Admin order routes
orderRouter.get("/admin", authorizeAdmin, getAllOrders);

// Payment routes
orderRouter.post(
  "/payment/stripe/create-session",
  authorizeUser,
  createStripeSession
);
orderRouter.post(
  "/payment/razorpay/create-order",
  authorizeUser,
  createRazorpayOrder
);
orderRouter.post(
  "/payment/razorpay/verify",
  authorizeUser,
  verifyRazorpayPayment
);

// Stripe webhook - no auth required as it comes from Stripe
orderRouter.post("/payment/stripe/webhook", handleStripeWebhook);

// Create order from Stripe session
orderRouter.get(
  "/payment/stripe/complete",
  authorizeUser,
  createOrderFromStripeSession
);

export default orderRouter;
