import express from "express";
import {
  getRevenueByDay,
  getRevenueByMonth,
  getBestSeller,
  getDashboardSummary,
} from "../controllers/analytics.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// chỉ admin xem dashboard
router.get(
  "/revenue/day",
  protect,
  requireRole("admin"),
  getRevenueByDay
);

router.get(
  "/revenue/month",
  protect,
  requireRole("admin"),
  getRevenueByMonth
);

router.get(
  "/best-seller",
  protect,
  requireRole("admin"),
  getBestSeller
);

router.get(
  "/summary",
  protect,
  requireRole("admin"),
  getDashboardSummary
);

export default router;