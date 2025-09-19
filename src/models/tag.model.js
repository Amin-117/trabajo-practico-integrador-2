import mongoose from "mongoose";
const { Schema, model } = mongoose;

const articleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    minlength: 200,
  },
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
