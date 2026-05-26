import User from "../models/User.js";
import bcrypt from "bcryptjs";


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
export const registerService = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "customer",
  });

  const token = generateToken(user);

  return {
    user,
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

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

// GET PROFILE
export const getProfileService = async (userId) => {
  return await User.findById(userId).select("-password");
};