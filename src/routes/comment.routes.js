import { Router } from "express";

import {
  createComment,
  getCommentsByArticle,
  getMyComments,
  updateComments,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/custom/ownerOrAdmin.Middleware.js";
import { validationResult } from "express-validator";

export const commentRouter = Router();

commentRouter.use(authMiddleware);

commentRouter.post("/comment", createComment);

commentRouter.get("/comments/article/:articleId", getCommentsByArticle);

commentRouter.get("/comment/my", getMyComments);

commentRouter.put(
  "/comment/:id",
  ownerOrAdminMiddleware,
  validationResult,
  updateComments
);

commentRouter.delete(
  "/comment/:id",
  ownerOrAdminMiddleware,
  validationResult,
  deleteComment
);
