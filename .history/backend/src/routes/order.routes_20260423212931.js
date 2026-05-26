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
// ===== CUSTOMER =====
router.get("/customer", getOrdersByTable);

// ===== STAFF / ADMIN =====
router.get("/", protect, requireRole("admin", "staff"), getOrders);

router.get("/:id", protect, requireRole("admin", "staff"), getOrderById);

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