import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  payOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===== CUSTOMER (QR) =====
router.post("/", createOrder); // cho phép khách không login

// ===== STAFF / ADMIN =====
router.get("/", protect, requireRole("admin", "staff"), getOrders);

router.get("/:id", protect, requireRole("admin", "staff"), getOrderById);

router.patch(
  "/:id/status",
  protect,
  requireRole("admin", "staff"),
  updateOrderStatus
);

router.patch(
  "/:id/pay",
  protect,
  requireRole("admin", "staff"),
  payOrder
);

router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  deleteOrder
);

export default router;