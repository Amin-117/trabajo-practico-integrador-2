import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profile: {
    first_name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    last_name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    biography: {
      type: String,
      maxlength: 500,
    },
    avatar_url: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
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

export const UserModel = model("User", userSchema);
