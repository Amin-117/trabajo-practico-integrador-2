import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { validateResult } from "../middlewares/validationResult.middleware.js";
import { validateUserCreation } from "../middlewares/custom/user.middleware.js";

export const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.post(
  "/auth/register",
  validateUserCreation,
  validateResult,
  registerUser
);
//authRouter.post("/auth/login", loginUser);
//authRouter.post("auth/profile", getUserProfile);
//authRouter.post("/authprofile", updateUserProfile);
//authRouter.post("/auth/logout", logoutUser);
