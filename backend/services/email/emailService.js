import nodemailer from "nodemailer";
import {
  getOrderConfirmationTemplate,
  getOrderFailedTemplate,
} from "./templates/orderConfirmation.js";

// Create a transporter using Mailtrap for testing
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendOrderConfirmationEmail = async (order, user) => {
  try {
    // Make sure we have a valid user email
    if (!user || !user.email) {
      console.error("Missing user email for order confirmation");
      return false;
    }

    const mailOptions = {
      from: '"TrendZ Store" <noreply@trendz.com>',
      to: user.email,
      subject: `Order Confirmation - Order #${order._id}`,
      html: getOrderConfirmationTemplate(order, user),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return false;
  }
};

export const sendOrderFailedEmail = async (order, user) => {
  try {
    // Make sure we have a valid user email
    if (!user || !user.email) {
      console.error("Missing user email for order failed notification");
      return false;
    }

    const mailOptions = {
      from: '"TrendZ Store" <noreply@trendz.com>',
      to: user.email,
      subject: `Order Transaction Failed - Order #${order._id}`,
      html: getOrderFailedTemplate(order, user),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Order failed email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending order failed email:", error);
    return false;
  }
};
