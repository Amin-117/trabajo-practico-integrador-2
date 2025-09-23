import { Router } from "express";

import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/custom/ownerOrAdmin.Middleware.js";
import {
  validateArticleCreation,
  validateArticleUpdate,
} from "../middlewares/custom/article.middleware.js";
import { validateResult } from "../middlewares/validationResult.middleware.js";

export const articleRouter = Router();

articleRouter.use(authMiddleware);

articleRouter.post(
  "/article",
  validateArticleCreation,
  validateResult,
  createArticle
);

articleRouter.get("/article", getArticles);

articleRouter.get("/article", getArticleById);

// articleRouter.get("/article/my", getMyArticles);

articleRouter.put(
  "/article",
  ownerOrAdminMiddleware,
  validateArticleUpdate,
  validateResult,
  updateArticle
);

articleRouter.delete(
  "/article",
  ownerOrAdminMiddleware,
  validateResult,
  deleteArticle
);
