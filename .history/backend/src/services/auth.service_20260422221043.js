import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// REGISTER
export const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "customer", // 🔥 FIX cứng
  });

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

// LOGIN
export const loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  if (!user.isActive) throw new Error("Account is disabled");

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  // remove password
  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

// GET PROFILE
export const getProfileService = async (userId) => {
  return await User.findById(userId).select("-password");
};