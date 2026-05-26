import express from "express";
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  createQrOrder,
  createStaffOrder,
  createAppOrder,
} from "../controllers/order.controller.js";

import {
  protect,
  requireRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();



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