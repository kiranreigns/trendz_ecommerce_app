import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {
  authorizeAdmin,
  authorizeUser,
} from "../middlewares/auth.middleware.js";

const orderRouter = Router();

// User order routes
orderRouter.post("/orders", authorizeUser, createOrder);

// Get user orders
orderRouter.get("/orders", authorizeUser, getUserOrders);

// Cancel user order
orderRouter.delete("/orders/:orderId", authorizeUser, cancelOrder);

// Update user order
orderRouter.put("/orders/:orderId", authorizeAdmin, updateOrderStatus);

// Admin order routes
orderRouter.get("/admin/orders", authorizeAdmin, getAllOrders);

export default orderRouter;
