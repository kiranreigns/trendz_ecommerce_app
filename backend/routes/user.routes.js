import express from "express";
import { authorizeUser } from "../middlewares/auth.middleware.js";
import {
  updateWishlist,
  updateBag,
  getUserData,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses
} from "../controllers/user.controller.js";

const router = express.Router();

// Wishlist routes
router.post("/wishlist", authorizeUser, updateWishlist);

// Bag routes
router.post("/bag", authorizeUser, updateBag);

// Get user data
router.get("/data", authorizeUser, getUserData);

// Address routes
router.get("/addresses", authorizeUser, getAddresses);
router.post("/addresses", authorizeUser, addAddress);
router.put("/addresses/:addressId", authorizeUser, updateAddress);
router.delete("/addresses/:addressId", authorizeUser, deleteAddress);

export default router;