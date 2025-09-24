import mongoose from "mongoose";
const { Schema, model } = mongoose;

const articleSchema = new Schema({
  tittle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
  excerpt: {
    type: String,
    maxlength: 500,
    required: false,
  },
  status: {
    type: String,
    enum: ["archived", "published"],
    default: "published",
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export const ArticleModel = model("Article", articleSchema);
