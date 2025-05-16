import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { JWT_SECRET, ADMIN_EMAIL } from "../config/env.js";

export const authorizeAdmin = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.adminId !== "admin" + ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: error.message });
  }
};

export const authorizeUser = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
