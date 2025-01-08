import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "username is required"], unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema); //or create new model

export default User;
//we take users in string in nextjs only
