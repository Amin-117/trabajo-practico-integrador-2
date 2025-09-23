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

export const tagRouter = Router();

tagRouter.use(authMiddleware);

tagRouter.post("/tags", adminMiddleware, createTag);
tagRouter.get("/tags", getTags);
tagRouter.get("/tags", getTagById);
tagRouter.put("/tags", adminMiddleware, updateTag);
tagRouter.delete("/tags", adminMiddleware, deleteTag);
