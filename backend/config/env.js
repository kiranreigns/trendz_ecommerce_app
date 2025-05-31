import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = process.env;
