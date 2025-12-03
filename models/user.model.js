// USER SCHEMA WILL BE ADDED HERE
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    avatar: {
      type: String,
      default : 'https://i.ibb.co.com/JFdJJ5F6/ndefault.jpg'
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
