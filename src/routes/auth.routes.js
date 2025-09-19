import express from "express";

import { registerUser } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
// authRouter.post("/auth/login", loginUser);
// authRouter.post("auth/profile", getUserProfile);
// authRouter.post("/authprofile", updateUserProfile);
// authRouter.post("/auth/logout", logoutUser);
