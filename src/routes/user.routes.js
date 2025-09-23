import { Router } from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { validateResult } from "../middlewares/validationResult.middleware.js";
import { adminMiddleware } from "../middlewares/custom/admin.middleware.js";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/user", adminMiddleware, validateResult, getUsers);
userRouter.get("/user/:id", adminMiddleware, validateResult, getUserById);
userRouter.put("/user", adminMiddleware, validateResult, updateUser);
userRouter.delete("/user", adminMiddleware, validateResult, deleteUser);
