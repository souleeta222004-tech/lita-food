import express from "express";
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// PRIVATE
router.get("/profile", verifyToken, getProfile);

// ROLE TEST
router.get(
  "/admin",
  verifyToken,
  requireRole("admin"),
  (req, res) => {
    res.json({ message: "Admin access" });
  }
);

router.get(
  "/staff",
  verifyToken,
  requireRole("admin", "staff"),
  (req, res) => {
    res.json({ message: "Staff access" });
  }
);

router.get(
  "/customer",
  verifyToken,
  requireRole("customer"),
  (req, res) => {
    res.json({ message: "Customer access" });
  }
);

export default router;