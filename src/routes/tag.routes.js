import { Router } from "express";

import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/custom/auth.middleware.js";
import { adminMiddleware } from "../middlewares/custom/admin.middleware.js";
import {
  validateTagCreation,
  validateTagUpdate,
} from "../middlewares/custom/tag.middleware.js";
import { validateResult } from "../middlewares/validationResult.middleware.js";

export const tagRouter = Router();

tagRouter.use(authMiddleware);

tagRouter.post(
  "/tags",
  adminMiddleware,
  validateTagCreation,
  validateResult,
  createTag
);
tagRouter.get("/tags", getTags);

tagRouter.get("/tags", getTagById);

tagRouter.put(
  "/tags",
  adminMiddleware,
  validateTagUpdate,
  validateResult,
  updateTag
);

tagRouter.delete("/tags", adminMiddleware, deleteTag);
