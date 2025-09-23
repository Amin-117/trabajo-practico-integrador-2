import { Router } from "express";

import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { adminMiddleware } from "../middlewares/custom/admin.middleware.js";

export const articleRouter = Router();

articleRouter.use(authMiddleware);

articleRouter.post("/article", createArticle);
articleRouter.get("/article", getArticles);
articleRouter.get("/article", getArticleById);
articleRouter.get("/article/my", getMyArticles);
// articleRouter.delete("/article" deleteArticle);
