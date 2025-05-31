import { Router } from "express";
import User from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import {
  STRIPE_SECRET_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} from "../config/env.js";

const orderRouter = Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      total,
      shippingAddress,
      paymentMethod,
      paymentGateway,
      transactionId,
    } = req.body;
    const userId = req.user._id;

    // Ensure each item has a status
    const itemsWithStatus = items.map((item) => ({
      ...item,
      status: "Ordered",
    }));

    const orderData = {
      userId,
      items: itemsWithStatus,
      total,
      shippingAddress,
      status: "Ordered",
      payment: {
        paymentMethod,
        paymentGateway: paymentGateway || "",
        transactionId: transactionId || "",
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed",
      },
      orderedAt: new Date(),
    };

    const order = new Order(orderData);
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

// Cancel an order or order item
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { itemId } = req.body;
    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // If itemId is provided, cancel only that specific item
    if (itemId) {
      const item = order.items.find((item) => item._id.toString() === itemId);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Order item not found" });
      }

      if (item.status === "Delivered") {
        return res
          .status(400)
          .json({ success: false, message: "Cannot cancel delivered item" });
      }

      item.status = "Cancelled";

      // Check if all items are now cancelled, if so, cancel the entire order
      const allItemsCancelled = order.items.every(
        (item) => item.status === "Cancelled"
      );
      if (allItemsCancelled) {
        order.status = "Cancelled";
      }
    } else {
      // Cancel the entire order
      if (order.status === "Delivered") {
        return res
          .status(400)
          .json({ success: false, message: "Cannot cancel delivered order" });
      }

      order.status = "Cancelled";
      // Set all items to cancelled
      order.items.forEach((item) => {
        if (item.status !== "Delivered" && item.status !== "Returned") {
          item.status = "Cancelled";
        }
      });
    }

    // If payment was made, initiate refund process
    if (
      order.payment.paymentMethod === "Card" &&
      order.payment.paymentStatus === "Completed"
    ) {
      // Handle refund based on payment gateway
      if (
        order.payment.paymentGateway === "Stripe" &&
        order.payment.transactionId
      ) {
        try {
          // const refund =
          await stripe.refunds.create({
            payment_intent: order.payment.transactionId,
          });

          order.payment.paymentStatus = "Refunded";
        } catch (refundError) {
          console.error("Refund error:", refundError);
          // Continue with order cancellation even if refund fails
        }
      }
      // Add Razorpay refund handling here if needed
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: itemId ? "Order item cancelled" : "Order cancelled",
    });
  } catch (error) {
    next(error);
  }
};

// Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, itemId: paramItemId } = req.params;
    const { status, itemId: bodyItemId } = req.body;

    // Use itemId from params if available, otherwise from body
    const itemId = paramItemId || bodyItemId;

    const validStatuses = [
      "Ordered",
      "Shipped",
      "Out for delivery",
      "Delivered",
      "Cancelled",
      "Returned",
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

    // Check if this is an admin request
    const isAdmin = req.isAdmin === true;

    // For user requests, check if they own this order
    if (!isAdmin && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // If regular user is trying to update status, only allow "Returned" for delivered items
    if (!isAdmin && status !== "Returned") {
      return res.status(403).json({
        success: false,
        message: "Regular users can only mark items as returned",
      });
    }

    // If itemId is provided, update only that specific item's status
    if (itemId) {
      // Find the item by its _id
      const item = order.items.find((item) => item._id.toString() === itemId);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Order item not found" });
      }

      // Regular users can only return delivered items
      if (!isAdmin && item.status !== "Delivered") {
        return res.status(400).json({
          success: false,
          message: "Only delivered items can be marked as returned",
        });
      }

      item.status = status;
    } else {
      // Only admins can update the overall order status
      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Only admins can update overall order status",
        });
      }

      // Update the overall order status and all items
      order.status = status;
      // Update all items to match the order status (except for returned items)
      order.items.forEach((item) => {
        if (item.status !== "Returned") {
          item.status = status;
        }
      });
    }

    await order.save();

    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    next(error);
  }
};

// Get user orders
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ orderedAt: -1 });
    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("userId items.productId")
      .sort({ orderedAt: -1 });

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

// Create Stripe Checkout session
export const createStripeSession = async (req, res, next) => {
  try {
    const { amount, items, shippingAddress, shipping, tax } = req.body;

    if (!amount || !items || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Amount, items, and shipping address are required",
      });
    }

    // Create line items for products
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name || `Product ${item.productId}`,
          description: item.size ? `Size: ${item.size}` : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add shipping fee as a line item if it's not free
    if (shipping && shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping Fee",
          },
          unit_amount: Math.round(shipping * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    // Add tax as a line item
    if (tax && tax > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax (5%)",
          },
          unit_amount: Math.round(tax * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${req.headers.origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      metadata: {
        userId: req.user._id.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
        items: JSON.stringify(items),
        total: amount.toString(),
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
    });
  } catch (error) {
    next(error);
  }
};

// Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency: "INR",
      receipt: "receipt_" + crypto.randomBytes(8).toString("hex"),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      res.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Handle Stripe webhook events
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Get shipping address from metadata
      const shippingAddress = JSON.parse(session.metadata.shippingAddress);
      const userId = session.metadata.userId;
      const items = session.metadata.items
        ? JSON.parse(session.metadata.items)
        : [];

      // Ensure each item has a status
      const itemsWithStatus = items.map((item) => ({
        ...item,
        status: "Ordered",
      }));

      // Create order
      const orderData = {
        userId,
        items: itemsWithStatus,
        total: session.amount_total / 100,
        shippingAddress,
        status: "Ordered",
        payment: {
          paymentMethod: "Card",
          paymentGateway: "Stripe",
          transactionId: session.payment_intent,
          paymentStatus: "Completed",
        },
        orderedAt: new Date(),
      };

      const order = new Order(orderData);
      await order.save();

      // Clear user's bag
      await User.findByIdAndUpdate(userId, { $set: { bag: [] } });
    } catch (error) {
      console.error("Error processing Stripe webhook:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error processing webhook" });
    }
  }

  res.json({ received: true });
};

export default orderRouter;
// Create order from Stripe session
export const createOrderFromStripeSession = async (req, res, next) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Invalid or unpaid session",
      });
    }

    // Get data from session metadata
    const userId = session.metadata.userId;
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);
    const items = JSON.parse(session.metadata.items);
    const total = parseFloat(session.metadata.total);

    // Ensure each item has a status
    const itemsWithStatus = items.map((item) => ({
      ...item,
      status: "Ordered",
    }));

    // Create order data
    const orderData = {
      userId,
      items: itemsWithStatus,
      total,
      shippingAddress,
      status: "Ordered",
      payment: {
        paymentMethod: "Card",
        paymentGateway: "Stripe",
        transactionId: session.payment_intent,
        paymentStatus: "Completed",
      },
      orderedAt: new Date(),
    };

    // Check if order already exists with this transaction ID
    const existingOrder = await Order.findOne({
      "payment.transactionId": session.payment_intent,
    });

    if (existingOrder) {
      return res.json({
        success: true,
        message: "Order already created",
        order: existingOrder,
      });
    }

    // Create new order
    const order = new Order(orderData);
    await order.save();

    // Clear the user's bag
    await User.findByIdAndUpdate(userId, { $set: { bag: [] } });

    res.json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
