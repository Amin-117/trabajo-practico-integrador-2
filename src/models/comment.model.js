import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    minlength: 5,
    maxlength: 500,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
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

export const CommentModel = model("Comment", commentSchema);
