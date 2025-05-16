import express from "express";
import { authorizeUser } from "../middlewares/auth.middleware.js";
import {
  updateWishlist,
  updateBag,
  getUserData,
} from "../controllers/user.controller.js";

const router = express.Router();

// Wishlist routes
router.post("/wishlist", authorizeUser, updateWishlist);

// Bag routes
router.post("/bag", authorizeUser, updateBag);

// Get user data
router.get("/data", authorizeUser, getUserData);

export default router;
