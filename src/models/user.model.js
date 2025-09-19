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
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profile: {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    biography: {
      type: String,
      maxlength: 500,
    },
    avatarUrl: {
      type: String,
    },
    birthDate: {
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
