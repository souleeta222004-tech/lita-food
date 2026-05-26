import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
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

// CUSTOMER QR (no auth)
router.post("/qr", createQrOrder);

// STAFF
router.post("/staff", protect, requireRole("staff", "admin"), createStaffOrder);

// APP USER
router.post("/app", protect, createAppOrder);

router.patch(
  "/:id/status",
  protect,
  requireRole("admin", "staff"),
  updateOrderStatus
);


router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  deleteOrder
);

export default router;