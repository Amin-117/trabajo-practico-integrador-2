import { Router } from "express";

export const authRouter = Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("auth/profile", getUserProfile);
authRouter.post("/authprofile", updateUserProfile);
authRouter.post("/auth/logout", logoutUser);
