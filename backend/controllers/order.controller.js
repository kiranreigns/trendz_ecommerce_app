import { Router } from "express";
import User from "../models/user.model.js";
import { Order } from "../models/order.model.js";

const orderRouter = Router();

export const createOrder = async (req, res, next) => {
  try {
    const { items, total, shippingAddress, paymentMethod } = req.body;
    const userId = req.user._id;

    const order = new Order({
      userId,
      items,
      total,
      shippingAddress,
      status: "Ordered",
      paymentMethod,
      orderedAt: new Date(),
    });

    await order.save();
    // Clear the bag after successful order
    await User.findByIdAndUpdate(userId, { $set: { bag: [] } });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (order.status === "delivered") {
      return res
        .status(400)
        .json({ success: false, message: "Cannot cancel delivered order" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "shipped",
      "out for delivery",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("userId items.productId");

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export default orderRouter;
