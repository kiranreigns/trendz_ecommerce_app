import { Router } from "express";
import {
  login,
  signup,
  adminLogin,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/admin", adminLogin);
authRouter.get("/me", authorizeUser, getCurrentUser);

export default authRouter;
